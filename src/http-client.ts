import { HttpClient, HttpClientResponse } from "@actions/http-client";
import { Effect } from "effect";
import * as IdToken from "./id-token";
import { FileSchema } from "./config";
import * as GenericError from "./error";
import { debug } from "@actions/core";
import { inspect } from "util";
import { parseResponse } from "./body-schema";

/**
 * Create an HTTP client that is authenticated with the ID token.
 */
export const create = Effect.gen(function* (_) {
  const idToken = yield* _(IdToken.read);
  const httpClient = new HttpClient(`benchy-action`, [], {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return httpClient;
});

const readJsonBody = (response: HttpClientResponse) =>
  Effect.tryPromise({
    try: async () => ({ ...response, body: await response.readBody() }),
    catch: (error) =>
      new GenericError.GenericError({
        message: `Failed to read response body`,
        error,
      }),
  }).pipe(
    Effect.flatMap((bodyString) =>
      Effect.try({
        try: () => ({
          ...response,
          json: JSON.parse(bodyString.body) as unknown,
        }),
        catch: (error) =>
          new GenericError.GenericError({
            message: `Failed to parse JSON of response body`,
            error,
          }),
      })
    ),
    Effect.mapError(
      (err) =>
        new GenericError.GenericError({
          error: err.error,
          message: `HTTP ${response.message.statusCode}: ${err.message}`,
        })
    ),
    Effect.map((body) => body.json)
  );

export const postMetrics = (httpClient: HttpClient, metrics: FileSchema) =>
  Effect.tryPromise({
    try: () =>
      httpClient.post(
        "https://benchy.hagever.com/api/metrics",
        JSON.stringify({
          metrics,
        })
      ),
    catch: (error) =>
      new GenericError.GenericError({
        message: `Failed to send metrics`,
        error,
      }),
  }).pipe(
    Effect.flatMap((response) =>
      Effect.gen(function* (_) {
        const body = yield* _(readJsonBody(response));
        const parsed = yield* _(
          parseResponse(body),
          Effect.mapError(
            (error) =>
              new GenericError.GenericError({
                error: error,
                message: `Response is malformed`,
              })
          )
        );
        if (parsed.error) {
          return yield* _(
            Effect.fail(
              new GenericError.GenericError({
                error: new Error(
                  `HTTP ${response.message.statusCode}: ${parsed.message}`
                ),
                message: parsed.message,
              })
            )
          );
        }
        return {
          ...response,
          body: parsed,
        };
      })
    ),
    Effect.tap((response) =>
      Effect.sync(() =>
        debug(`got response: ${inspect(response, { depth: 10, colors: true })}`)
      )
    )
  );
