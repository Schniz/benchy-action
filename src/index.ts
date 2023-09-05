import * as Config from "./config";
import { Effect } from "effect";
import * as GenericError from "./error";
import { exhaustiveEffect } from "./util";
import * as Chalk from "./chalk";
import * as IdToken from "./id-token";
import * as HttpClient from "./http-client";
import { warning } from "@actions/core";
import * as Table from "./table";

const println = (str: string) => Effect.sync(() => console.log(str));

const main = Effect.gen(function* (_) {
  const config = yield* _(Config.read);
  const httpClient = yield* _(HttpClient.create);
  const response = yield* _(HttpClient.postMetrics(httpClient, config.metrics));

  for (const warn of response.body.data.warnings) {
    yield* _(Effect.sync(() => warning(warn)));
  }

  const table = yield* _(Table.build(response.body.data.metrics));
  yield* _(println(table));
});

main.pipe(
  Effect.catchTag("IdTokenError", (err) => IdToken.intoGenericError(err)),
  Effect.catchTag("GenericError", (err) => GenericError.handleInCli(err)),
  exhaustiveEffect,
  Effect.provideServiceEffect(Chalk.tag, Chalk.withForcedAnsiColors),
  Effect.runPromise
);
