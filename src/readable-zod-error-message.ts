import { ZodError } from "zod";
import { generateErrorMessage } from "zod-error";

export function readableZodErrorMessage(error: ZodError): string {
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
