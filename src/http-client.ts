import { HttpClient, HttpClientResponse } from "@actions/http-client";
import { Effect } from "effect";
import * as IdToken from "./id-token";
import { ActionInput, FileSchema } from "./config";
import * as GenericError from "./error";
import { debug } from "@actions/core";
import { inspect } from "util";
import { parseResponse } from "./body-schema";

/**
 * Create an HTTP client that is authenticated with the ID token.
 */
export const create = Effect.gen(function* () {
  const idToken = yield* IdToken.read;
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
      }),
    ),
    Effect.mapError(
      (err) =>
        new GenericError.GenericError({
          error: err.error,
          message: `HTTP ${response.message.statusCode}: ${err.message}`,
        }),
    ),
    Effect.map((body) => body.json),
  );

export const postMetrics = (httpClient: HttpClient, metrics: FileSchema) =>
  Effect.gen(function* () {
    const { serverUrl } = yield* ActionInput;
    const url = `${String(serverUrl).replace(/\/+$/, "")}/api/metrics`;
    const response = yield* Effect.tryPromise({
      try: () => httpClient.post(url, JSON.stringify({ metrics })),
      catch: (error) =>
        new GenericError.GenericError({
          message: `Failed to send metrics`,
          error,
        }),
    });
    const body = yield* readJsonBody(response);
    const parsed = yield* parseResponse(body).pipe(
      Effect.mapError(
        (error) =>
          new GenericError.GenericError({
            error: error,
            message: `Response is malformed`,
          }),
      ),
    );
    if (parsed.error) {
      return yield* Effect.fail(
        new GenericError.GenericError({
          error: new Error(
            `HTTP ${response.message.statusCode}: ${parsed.message}`,
          ),
          message: parsed.message,
        }),
      );
    }

    const result = { ...response, body: parsed };

    yield* Effect.sync(() => {
      debug(`got response: ${inspect(result, { depth: 10, colors: true })}`);
    });

    return result;
  });
