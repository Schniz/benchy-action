import { HttpClient } from "@actions/http-client";
import { Effect } from "effect";
import * as IdToken from "./id-token";
import { FileSchema } from "./config";
import * as GenericError from "./error";
import { debug } from "@actions/core";
import { inspect } from "util";
import * as Schema from "@effect/schema/Schema";

const FailureSchema = Schema.struct({
  error: Schema.literal(true),
  message: Schema.string,
});

const SuccessSchema = Schema.struct({
  error: Schema.literal(false),
});

const ResponseSchema = Schema.union(FailureSchema, SuccessSchema);
const parseResponse = Schema.parse(ResponseSchema);

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
      Effect.gen(function* (_) {
        const parsed = yield* _(
          parseResponse(response.result),
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
                  `HTTP ${response.statusCode}: ${parsed.message}`
                ),
                message: parsed.message,
              })
            )
          );
        }
      })
    ),
    Effect.tap((response) =>
      Effect.sync(() =>
        debug(`got response: ${inspect(response, { depth: 10, colors: true })}`)
      )
    )
  );
