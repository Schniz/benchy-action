import { ZodError } from "zod";
import { generateErrorMessage } from "zod-error";
import * as core from "@actions/core";

export function readableZodErrorMessage(error: ZodError): string {
  core.debug(`ZodError: ${JSON.stringify(error.issues, null, 2)}`);
  return generateErrorMessage(error.issues as any, {
    code: {
      enabled: false,
    },
    message: {
      enabled: true,
      label: null,
    },
    path: {
      enabled: true,
      transform(params) {
        return "`" + params.value + "`";
      },
      type: "breadcrumbs",
    },
    delimiter: {
      component: ": ",
    },
  });
}
