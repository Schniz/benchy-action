import { readMetrics, getInput } from "./config";
import { Effect } from "effect";
import { getIDToken, error } from "@actions/core";
import { HttpClient } from "@actions/http-client";
import { GenericError } from "./error";
import { exhaustiveEffect } from "./util";

const getHttpClient = Effect.gen(function* (_) {
  const idToken = yield* _(
    Effect.tryPromise({
      try: () => getIDToken(),
      catch: (error) =>
        new GenericError({
          message: `Failed to get ID token, maybe you need to configure the permissions.`,
          error,
        }),
    })
  );
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
        new GenericError({
          message: `Failed to send metrics`,
          error,
        }),
    })
  );

  console.log(`received`, response);
});

main.pipe(
  Effect.catchTag("GenericError", (err) => {
    error(err.message);
    process.exitCode = 1;
    return Effect.unit;
  }),
  exhaustiveEffect,
  Effect.runPromise
);
