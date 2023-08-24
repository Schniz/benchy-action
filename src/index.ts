import { readMetrics, getInput } from "./config";
import { Effect } from "effect";
import { HttpClient } from "@actions/http-client";
import * as GenericError from "./error";
import { exhaustiveEffect } from "./util";
import * as Chalk from "./chalk";
import * as IdToken from "./id-token";

const getHttpClient = Effect.gen(function* (_) {
  const idToken = yield* _(IdToken.read);
  const httpClient = new HttpClient(`bnz-action`, [], {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return httpClient;
});

const main = Effect.gen(function* (_) {
  const input = yield* _(getInput);
  const metrics = yield* _(readMetrics(input));

  const httpClient = yield* _(getHttpClient);
  const response = yield* _(
    Effect.tryPromise({
      try: () =>
        httpClient.postJson("https://bnz-web.vercel.app/api/metrics", {
          metrics,
        }),
      catch: (error) =>
        new GenericError.GenericError({
          message: `Failed to send metrics`,
          error,
        }),
    })
  );

  console.log(`received`, response);
});

main.pipe(
  Effect.catchTag("IdTokenError", (err) => IdToken.intoGenericError(err)),
  Effect.catchTag("GenericError", (err) => GenericError.handleInCli(err)),
  exhaustiveEffect,
  Effect.provideServiceEffect(Chalk.tag, Chalk.withForcedAnsiColors),
  Effect.runPromise
);
