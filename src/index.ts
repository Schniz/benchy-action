import * as Config from "./config";
import { Effect } from "effect";
import * as GenericError from "./error";
import { exhaustiveEffect } from "./util";
import * as Chalk from "./chalk";
import * as IdToken from "./id-token";
import * as HttpClient from "./http-client";

const main = Effect.gen(function* (_) {
  const input = yield* _(Config.read);
  const metrics = yield* _(Config.normalize(input));

  const httpClient = yield* _(HttpClient.create);
  yield* _(HttpClient.postMetrics(httpClient, metrics));
});

main.pipe(
  Effect.catchTag("IdTokenError", (err) => IdToken.intoGenericError(err)),
  Effect.catchTag("GenericError", (err) => GenericError.handleInCli(err)),
  exhaustiveEffect,
  Effect.provideServiceEffect(Chalk.tag, Chalk.withForcedAnsiColors),
  Effect.runPromise
);
