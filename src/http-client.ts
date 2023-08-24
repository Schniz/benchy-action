import { HttpClient } from "@actions/http-client";
import { Effect } from "effect";
import * as IdToken from "./id-token";
import { FileSchema } from "./config";
import * as GenericError from "./error";
import { debug } from "@actions/core";
import { inspect } from "util";

/**
 * Create an HTTP client that is authenticated with the ID token.
 */
export const create = Effect.gen(function* (_) {
  const idToken = yield* _(IdToken.read);
  const httpClient = new HttpClient(`bnz-action`, [], {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return httpClient;
});

export const postMetrics = (httpClient: HttpClient, metrics: FileSchema) =>
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
  }).pipe(
    Effect.tap((response) =>
      Effect.sync(() =>
        debug(`got response: ${inspect(response, { depth: 10, colors: true })}`)
      )
    )
  );
