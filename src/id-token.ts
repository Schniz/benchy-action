import { Data, Effect } from "effect";
import * as Chalk from "./chalk";
import dedent from "dedent";
import { GenericError } from "./error";
import { getIDToken } from "@actions/core";

export class IdTokenError extends Data.TaggedClass("IdTokenError")<{
  error: unknown;
}> {}

export const intoGenericError = (tokenError: IdTokenError) =>
  Effect.gen(function* () {
    const chalk = yield* Chalk.Chalk;
    const ID_TOKEN_COLORED = chalk.cyan("`id-token`");
    const message = dedent`
    Failed to read GitHub Actions ID token.
  
    This means you probably forgot to add permissions for ${ID_TOKEN_COLORED} in your workflow/job definition.
    The ${ID_TOKEN_COLORED} permissions allows GitHub to sign your requests to the Benchy API. This does not
    give GitHub access to your Benchy account: it's merely a way to prove that the request is coming
    from your GitHub workflow.
  
    An example of a workflow with the ${ID_TOKEN_COLORED} permission:
  
    \`\`\`yaml
     jobs:
       test:
         runs-on: ubuntu-latest
    ${chalk.green(`+    permissions:`)}
    ${chalk.green(`+      id-token: write`)}
         steps:
           # ...
    \`\`\`
  
    For more information about the ${ID_TOKEN_COLORED} permisison, see the GitHub documentation on OpenID Connect: https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#overview-of-openid-connect
     `;
    return yield* Effect.fail(
      new GenericError({ message, error: tokenError.error }),
    );
  });

export const read = Effect.tryPromise({
  try: () => getIDToken(),
  catch: (e) => new IdTokenError({ error: e }),
});
