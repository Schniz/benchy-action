import { readMetrics, getInput } from "./config";
import { Effect } from "effect";
import { getIDToken, error } from "@actions/core";
import { HttpClient } from "@actions/http-client";
import { GenericError } from "./error";
import { exhaustiveEffect } from "./util";
import dedent from "dedent";
import { Chalk } from "chalk";

const chalk = new Chalk({ level: 2 });

const ID_TOKEN_COLORED = chalk.cyan("`id-token`");

const ID_TOKEN_ERROR = dedent`
  Failed to read GitHub Actions ID token.

  This means you probably forgot to add permissions for ${ID_TOKEN_COLORED} in your workflow/job definition.
  The ${ID_TOKEN_COLORED} permissions allows GitHub to sign your requests to the Benchy API. This does not
  give GitHub access to your Benchy account: it's merely a way to prove that the request is coming
  from your GitHub workflow.

  An example of a workflow with the ${ID_TOKEN_COLORED} permission:

  ${chalk.dim.yellow("```yaml")}
   jobs:
     test:
       runs-on: ubuntu-latest
  ${chalk.green(`+    permissions:`)}
  ${chalk.green(`+      id-token: write`)}
       steps:
         ${chalk.dim.white("# ...")}
  ${chalk.dim.yellow("```")}

  For more information about the id-token permisison, see the [GitHub documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#overview-of-openid-connect).
`;

const getIdToken = Effect.tryPromise({
  try: () => getIDToken(),
  catch: (error) =>
    new GenericError({
      message: ID_TOKEN_ERROR,
      error,
    }),
});

const getHttpClient = Effect.gen(function* (_) {
  const idToken = yield* _(getIdToken);
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
    error(err.message + "\n" + String(err.error));
    process.exitCode = 1;
    return Effect.unit;
  }),
  exhaustiveEffect,
  Effect.runPromise
);
