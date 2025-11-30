import {
  Config,
  Effect,
  Match,
  pipe,
  Option,
  Array as ReadonlyArray,
  identity,
  Schema,
  ParseResult,
  flow,
} from "effect";
import fs from "fs/promises";
import * as Globber from "@actions/glob";
import { GenericError } from "./error";
import * as Path from "path";
import { FileSchema, Metric } from "./file-schema";

const metricsDataConfig = Config.string("INPUT_FILE").pipe(
  Config.map((path) => ({ _tag: "File" as const, path })),
  Config.orElse(() =>
    Config.string("JSON").pipe(
      Config.map((value) => ({
        _tag: "Json" as const,
        stringified: value,
      })),
    ),
  ),
  Config.orElse(() =>
    pipe(
      Config.all({
        key: Config.string("KEY"),
        value: Config.number("VALUE"),
      }),
      Config.map(({ key, value }) => ({ _tag: "KeyVal" as const, key, value })),
    ),
  ),
);

const actionInput = Config.all({
  metricsInput: metricsDataConfig.pipe(Config.option),
  trackFileSizeGlob: Config.string("TRACK_FILE_SIZE").pipe(Config.option),
  serverUrl: Config.string("SERVER_URL").pipe(
    Config.withDefault("https://benchy.hagever.com"),
    Config.mapAttempt((x) => new URL(x)),
  ),
}).pipe(Config.nested("INPUT"));

type Input = typeof actionInput extends Config.Config<infer A> ? A : never;

export const encodeFileSchema = Schema.encode(FileSchema);
const parseFileSchema: (
  input: string,
) => Effect.Effect<Metric[], GenericError> = flow(
  Schema.decode(Schema.parseJson(FileSchema)),
  Effect.map((x) => ("metrics" in x ? x.metrics : x)),
  Effect.map((x) => [x].flat()),
  Effect.mapError(
    (error) =>
      new GenericError({
        error,
        message: `Failed to parse given JSON:\n${ParseResult.TreeFormatter.formatErrorSync(
          error,
        )}`,
      }),
  ),
);

const parseFile = (pathname: string) =>
  Effect.tryPromise({
    try: () => fs.readFile(pathname, "utf-8"),
    catch: (error) =>
      new GenericError({ message: `Failed to read file`, error }),
  }).pipe(Effect.flatMap(parseFileSchema));

const resolveGlob = (glob: string) =>
  Effect.gen(function* () {
    const globber = yield* Effect.tryPromise({
      try: () => Globber.create(glob),
      catch: (error) =>
        new GenericError({ message: `Failed to parse glob syntax`, error }),
    });

    const paths = yield* Effect.tryPromise({
      try: () => globber.glob(),
      catch: (error) =>
        new GenericError({
          message: `Failed to iterate through glob`,
          error,
        }),
    });

    return paths;
  });

const parseGlob = (glob: string) =>
  Effect.gen(function* () {
    const paths = yield* resolveGlob(glob);
    const jsons = yield* Effect.all(paths.map(parseFile), { concurrency: 5 });

    return jsons.flat();
  });

export type FileSchema = Schema.Schema.Type<typeof FileSchema>;

const normalize = (value: Input["metricsInput"]) =>
  Option.match(value, {
    onNone: () => Effect.succeed([]),
    onSome: (v) =>
      Match.value(v).pipe(
        Match.tagsExhaustive({
          File: ({ path }) => parseGlob(path),
          Json: ({ stringified }) => parseFileSchema(stringified),
          KeyVal: ({ key, value }) =>
            Effect.succeed([{ key, value } satisfies Metric]),
        }),
      ),
  });

export class ActionInput extends Effect.Service<ActionInput>()(
  "benchy-action/config/ActionInput",
  {
    effect: actionInput,
  },
) {}

export const read = Effect.gen(function* () {
  const config = yield* ActionInput;
  const metricsFromInput = yield* normalize(config.metricsInput);
  const metricsFromFileSize = yield* config.trackFileSizeGlob.pipe(
    Option.match({
      onNone: () => Effect.succeed([]),
      onSome: (glob) => getFileSizeMetricsFromGlob(glob),
    }),
  );
  const metrics = [...metricsFromInput, ...metricsFromFileSize];

  if (metrics.length === 0) {
    return yield* Effect.fail(
      new GenericError({
        error: new Error("No metrics were provided"),
        message: `No metrics were provided. Please provide metrics via the \`metrics\` input or \`track_file_size_glob\` input`,
      }),
    );
  }

  return {
    ...config,
    metrics,
  };
});

export const getFileSizeMetricsFromGlob = (glob: string) =>
  Effect.gen(function* () {
    const files = yield* resolveGlob(glob);
    const effects = files.map((file) =>
      Effect.gen(function* () {
        const stat = yield* Effect.tryPromise({
          try: () => fs.stat(file),
          catch: (error) =>
            new GenericError({
              error,
              message: `Failed to get file size for ${file}`,
            }),
        });

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
      }),
    );

    return yield* Effect.all(effects, { concurrency: 10 }).pipe(
      Effect.map((x) => ReadonlyArray.filterMap(x, identity)),
    );
  });
