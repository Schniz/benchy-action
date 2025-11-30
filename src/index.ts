import * as Config from "./config";
import { Effect, Layer } from "effect";
import * as GenericError from "./error";
import { exhaustiveEffect } from "./util";
import * as Chalk from "./chalk";
import * as IdToken from "./id-token";
import * as HttpClient from "./http-client";
import { warning, setOutput } from "@actions/core";
import * as Table from "./table";

const println = (str: string) => Effect.sync(() => console.log(str));

const main = Effect.gen(function* () {
  const config = yield* Config.read;
  const httpClient = yield* HttpClient.create;
  const response = yield* HttpClient.postMetrics(httpClient, config.metrics);

  setOutput("comment_markdown", response.body.data.markdown);

  for (const warn of response.body.data.warnings) {
    yield* Effect.sync(() => warning(warn));
  }

  const table = yield* Table.build(response.body.data.metrics);
  yield* println(table);
});

const runtime = Layer.mergeAll(Chalk.Chalk.Default);

main.pipe(
  Effect.catchTag("IdTokenError", (err) => IdToken.intoGenericError(err)),
  Effect.catchTag("GenericError", (err) => GenericError.handleInCli(err)),
  exhaustiveEffect,
  Effect.provide(runtime),
  Effect.runPromise,
);
