import { Config, Data, Effect, Match, pipe } from "effect";
import * as Schema from "@effect/schema/Schema";
import { formatErrors as formatSchemaErrors } from "@effect/schema/TreeFormatter";
import fs from "fs/promises";
import * as Globber from "@actions/glob";
import { GenericError } from "./error";

const actionInput = Config.string("INPUT_FILE").pipe(
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
  ),
  Config.nested("INPUT")
);

export const getInput = pipe(
  Effect.config(actionInput),
  Effect.mapError(
    (error) =>
      new GenericError({
        error,
        message: `Failed to read input`,
      })
  )
);

type Input = typeof actionInput extends Config.Config<infer A> ? A : never;

const parseJson = (json: string) =>
  Effect.try({
    try: (): unknown => JSON.parse(json),
    catch: (error) =>
      new GenericError({ message: `Failed to parse JSON`, error }),
  });

const Trend = Schema.literal("lower-is-better", "higher-is-better");
type Trend = Schema.To<typeof Trend>;

const Metric = Schema.struct({
  key: pipe(Schema.string, Schema.maxLength(120)),
  sortDate: pipe(Schema.string, Schema.dateFromString, Schema.optional),
  value: Schema.number,
  units: pipe(Schema.string, Schema.maxLength(32), Schema.optional),
  trend: pipe(Trend, Schema.optional),
});

export type Metric = Schema.To<typeof Metric>;

export const RequestBody = Schema.struct({
  metrics: pipe(Metric, Schema.array),
});

const MetricSchema = Schema.struct({
  key: pipe(
    Schema.string,
    Schema.maxLength(120),
    Schema.description("a key to identify the metric across runs")
  ),
  value: pipe(Schema.number, Schema.description("the value of the metric")),
  sortDate: pipe(
    Schema.string,
    Schema.dateFromString,
    Schema.description(
      "the date to apply sorting by. defaults to the commit time"
    ),
    Schema.optional
  ),
  units: pipe(
    Schema.string,
    Schema.maxLength(32),
    Schema.description("the units of the metric. example: ms, MiB"),
    Schema.optional
  ),
  trend: pipe(Trend, Schema.optional),
});

export type MetricSchema = Schema.To<typeof MetricSchema>;

export const FileSchema = Schema.union(
  pipe(MetricSchema, Schema.array),
  MetricSchema
);
export const encodeFileSchema = Schema.encode(FileSchema);
const parseFileSchema = (json: unknown) =>
  Schema.parse(FileSchema)(json).pipe(
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

const parseGlob = (glob: string) =>
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

    const jsons = yield* _(
      Effect.all(paths.map(parseFile), { concurrency: 5 })
    );

    return jsons.flat();
  });

export type FileSchema = Schema.To<typeof FileSchema>;

export const readMetrics = pipe(
  Match.type<Input>(),
  Match.tagsExhaustive({
    File: ({ path }) => parseGlob(path),
    Json: ({ stringified }) =>
      parseJson(stringified).pipe(Effect.flatMap(parseFileSchema)),
    KeyVal: ({ key, value }) =>
      Effect.succeed([{ key, value } satisfies Schema.To<typeof MetricSchema>]),
  })
);
