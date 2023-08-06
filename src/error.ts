import { Data } from "effect";

export class GenericError extends Data.TaggedClass("GenericError")<{
  error: unknown;
  message: string;
}> {}
