import { debug, error } from "@actions/core";
import { Data, Effect } from "effect";

export class GenericError extends Data.TaggedClass("GenericError")<{
  error: unknown;
  message: string;
}> {}

export const handleInCli = (err: GenericError) =>
  Effect.sync(() => {
    error(err.message);
    debug(`cause: ${err.error}`);
    process.exitCode = 1;
    return Effect.unit;
  });
