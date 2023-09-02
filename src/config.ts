import {
  Config,
  Effect,
  Match,
  pipe,
  Option,
  ReadonlyArray,
  identity,
} from "effect";
import * as Schema from "@effect/schema/Schema";
import * as AST from "@effect/schema/AST";
import { formatErrors as formatSchemaErrors } from "@effect/schema/TreeFormatter";
import fs from "fs/promises";
import * as Globber from "@actions/glob";
import { GenericError } from "./error";
import * as Path from "path";

const withJsonSchema =
  (v: object) =>
  <A, B>(schema: Schema.Schema<A, B>) =>
    schema.pipe(
      Schema.annotations({
        [AST.JSONSchemaAnnotationId]: {
          ...AST.getAnnotation<AST.JSONSchemaAnnotation>(
            AST.JSONSchemaAnnotationId
          )(schema.ast).pipe(Option.getOrNull),
          ...v,
        },
      })
    );

const withExamples =
  <A>(examples: A[]) =>
  <B>(schema: Schema.Schema<A, B>) =>
    schema.pipe(Schema.examples(examples), withJsonSchema({ examples }));

const withDescription =
  (description: string) =>
  <A, B>(schema: Schema.Schema<A, B>) =>
    schema.pipe(
      Schema.description(description),
      withJsonSchema({ description })
    );

const metricsDataConfig = Config.string("INPUT_FILE").pipe(
  Config.map((path) => ({ _tag: "File" as const, path })),
  Config.orElse(() =>
    Config.string("JSON").pipe(
      Config.map((value) => ({
        _tag: "Json" as const,
        stringified: value,
      }))
    )
  ),
  Config.orElse(() =>
    pipe(
      Config.all({
        key: Config.string("KEY"),
        value: Config.number("VALUE"),
      }),
      Config.map(({ key, value }) => ({ _tag: "KeyVal" as const, key, value }))
    )
  )
);

const actionInput = Config.all({
  metricsInput: metricsDataConfig.pipe(Config.option),
  trackFileSizeGlob: Config.string("TRACK_FILE_SIZE").pipe(Config.option),
}).pipe(Config.nested("INPUT"));

type Input = typeof actionInput extends Config.Config<infer A> ? A : never;

const parseJson = (json: string) =>
  Effect.try({
    try: (): unknown => JSON.parse(json),
    catch: (error) =>
      new GenericError({ message: `Failed to parse JSON`, error }),
  });

const Trend = Schema.union(
  Schema.literal("lower-is-better").pipe(
    withDescription(
      "if value is _lower_ than the previous run, the trend is _good_. otherwise, the trend is bad"
    )
  ),
  Schema.literal("higher-is-better").pipe(
    withDescription(
      "if value is _higher_ than the previous run, the trend is _good_. otherwise, the trend is bad"
    )
  )
).pipe(withDescription("The acceptable trend for the given metric"));
type Trend = Schema.To<typeof Trend>;

const Key = pipe(
  Schema.string,
  withDescription("A unique string that represents this metric across runs"),
  Schema.maxLength(120),
  Schema.minLength(1),
  Schema.minLength(1)
);

const Value = pipe(
  Schema.number,
  withDescription("The numeric value of the metric")
);

const SortDate = pipe(
  Schema.string,
  Schema.dateFromString,
  withDescription("the date to apply sorting by. defaults to the commit time"),
  withJsonSchema({
    format: "date-time",
  })
);

const Units = pipe(
  Schema.string,
  Schema.maxLength(32),
  withDescription("The units of the metric"),
  withExamples(["ms", "ns", "bytes", "kb", "mb"])
);

export const Metric = Schema.struct({
  key: Key,
  value: Value,
  sortDate: SortDate.pipe(Schema.optional),
  units: Units.pipe(Schema.optional),
  trend: Trend.pipe(Schema.optional),
}).pipe(
  withJsonSchema({
    additionalProperties: true,
  })
);

export type Metric = Schema.To<typeof Metric>;

export const RequestBody = Schema.struct({
  metrics: Metric.pipe(Schema.array),
});

export const FileSchema = Schema.union(
  Schema.struct({
    metrics: Schema.array(Metric).pipe(
      withDescription("A list of metrics to report")
    ),
  }).pipe(withJsonSchema({ additionalProperties: true })),
  Metric.pipe(Schema.array),
  Metric
);
export const encodeFileSchema = Schema.encode(FileSchema);
const parseFileSchema = (json: unknown) =>
  Schema.parse(FileSchema)(json).pipe(
    Effect.map((x) => ("metrics" in x ? x.metrics : x)),
    Effect.map((x) => [x].flat()),
    Effect.mapError(
      (error) =>
        new GenericError({
          error,
          message: `Failed to parse given JSON:\n${formatSchemaErrors(
            error.errors
          )}`,
        })
    )
  );

const parseFile = (pathname: string) =>
  Effect.tryPromise({
    try: () => fs.readFile(pathname, "utf-8"),
    catch: (error) =>
      new GenericError({ message: `Failed to read file`, error }),
  }).pipe(Effect.flatMap(parseJson), Effect.flatMap(parseFileSchema));

const resolveGlob = (glob: string) =>
  Effect.gen(function* (_) {
    const globber = yield* _(
      Effect.tryPromise({
        try: () => Globber.create(glob),
        catch: (error) =>
          new GenericError({ message: `Failed to parse glob syntax`, error }),
      })
    );

    const paths = yield* _(
      Effect.tryPromise({
        try: () => globber.glob(),
        catch: (error) =>
          new GenericError({
            message: `Failed to iterate through glob`,
            error,
          }),
      })
    );

    return paths;
  });

const parseGlob = (glob: string) =>
  Effect.gen(function* (_) {
    const paths = yield* _(resolveGlob(glob));
    const jsons = yield* _(
      Effect.all(paths.map(parseFile), { concurrency: 5 })
    );

    return jsons.flat();
  });

export type FileSchema = Schema.To<typeof FileSchema>;

export const normalize = (value: Input["metricsInput"]) =>
  Option.match(value, {
    onNone: () => Effect.succeed([]),
    onSome: (v) =>
      Match.value(v).pipe(
        Match.tagsExhaustive({
          File: ({ path }) => parseGlob(path),
          Json: ({ stringified }) =>
            parseJson(stringified).pipe(Effect.flatMap(parseFileSchema)),
          KeyVal: ({ key, value }) =>
            Effect.succeed([{ key, value } satisfies Metric]),
        })
      ),
  });

export const read = Effect.gen(function* (_) {
  const config = yield* _(
    Effect.config(actionInput),
    Effect.mapError(
      (error) =>
        new GenericError({
          error,
          message: `Failed to read input`,
        })
    )
  );
  const metricsFromInput = yield* _(normalize(config.metricsInput));
  const metricsFromFileSize = yield* _(
    config.trackFileSizeGlob,
    Option.match({
      onNone: () => Effect.succeed([]),
      onSome: (glob) => getFileSizeMetricsFromGlob(glob),
    })
  );
  const metrics = [...metricsFromInput, ...metricsFromFileSize];

  if (metrics.length === 0) {
    return yield* _(
      Effect.fail(
        new GenericError({
          error: new Error("No metrics were provided"),
          message: `No metrics were provided. Please provide metrics via the \`metrics\` input or \`track_file_size_glob\` input`,
        })
      )
    );
  }

  return {
    ...config,
    metrics,
  };
});

export const getFileSizeMetricsFromGlob = (glob: string) =>
  Effect.gen(function* (_) {
    const files = yield* _(resolveGlob(glob));
    const effects = files.map((file) =>
      Effect.gen(function* (_) {
        const stat = yield* _(
          Effect.tryPromise({
            try: () => fs.stat(file),
            catch: (error) =>
              new GenericError({
                error,
                message: `Failed to get file size for ${file}`,
              }),
          })
        );

        if (!stat.isFile()) {
          return Option.none();
        }

        const kb = stat.size.valueOf() / 1024;
        // TODO: maybe extract `path.relative` and `process.cwd` into
        // a service so I can test it?
        const key = Path.relative(process.cwd(), file);
        return Option.some({
          key,
          value: Number(kb),
          units: "kB",
          trend: "lower-is-better",
        } satisfies Metric);
      })
    );

    return yield* _(
      Effect.all(effects, { concurrency: 10 }),
      Effect.map((x) => ReadonlyArray.filterMap(x, identity))
    );
  });
