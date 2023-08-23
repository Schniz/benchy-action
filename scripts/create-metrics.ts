// @ts-check

import { formatErrors as formatSchemaErrors } from "@effect/schema/TreeFormatter";
import { Globber, create } from "@actions/glob";
import { relative } from "node:path";
import { MetricSchema, encodeFileSchema } from "../src/config";
import * as Fs from "@effect/platform-node/FileSystem";
import { Effect, pipe } from "effect";
import { GenericError } from "../src/error";
import { exhaustiveEffect } from "../src/util";

const createGlob = (...parameters: Parameters<typeof create>) =>
  Effect.tryPromise({
    try: async () => create(...parameters),
    catch: (error) =>
      new GenericError({
        error,
        message: `Failed to create globber for ${parameters[0]}`,
      }),
  });

const runGlob = (glob: Globber) =>
  Effect.tryPromise({
    try: async () => glob.glob(),
    catch: (error) =>
      new GenericError({
        error,
        message: `Failed to run globber for ${glob}: ${String(error)}`,
      }),
  });

const program = Effect.gen(function* (_) {
  const fs = yield* _(Fs.FileSystem);
  const globber = yield* _(
    createGlob("dist/**/*", {
      followSymbolicLinks: false,
      matchDirectories: false,
    })
  );
  const distDir = new URL("../dist", import.meta.url);
  const paths = yield* _(runGlob(globber));
  const metrics$ = paths.map((url) =>
    Effect.gen(function* (_) {
      const { size } = yield* _(
        fs.stat(url),
        Effect.mapError(
          (error) =>
            new GenericError({
              error,
              message: `Failed to stat ${url}`,
            })
        )
      );
      return {
        key: relative(distDir.pathname, url),
        value: Number(size.valueOf() / 1024n), // in KB
        units: "KB",
        trend: "lower-is-better",
      } satisfies MetricSchema;
    })
  );

  const metrics = yield* _(Effect.all(metrics$, { concurrency: 5 }));
  const fileContent = yield* _(
    encodeFileSchema(metrics),
    Effect.mapError(
      (error) =>
        new GenericError({
          error,
          message: `Failed to encode metrics: ${formatSchemaErrors(
            error.errors
          )}`,
        })
    )
  );
  const json = JSON.stringify(fileContent, null, 2);
  console.log(`storing`, json);
  yield* _(
    fs.makeDirectory("tmp", { recursive: true }),
    Effect.mapError(
      (error) =>
        new GenericError({ error, message: `Failed to create tmp directory` })
    )
  );
  yield* _(
    fs.writeFileString("tmp/metrics.json", json),
    Effect.mapError(
      (error) =>
        new GenericError({ error, message: `Failed to write metrics.json` })
    )
  );
});

pipe(
  program,
  Effect.catchTag("GenericError", (error) => Effect.logError(error)),
  exhaustiveEffect,
  Effect.provideLayer(Fs.layer),
  Effect.runPromise
);
