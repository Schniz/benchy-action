import type { Effect } from "effect";

export const exhaustiveEffect = <R, A>(
  _: Effect.Effect<R, never, A>,
): typeof _ => {
  return _;
};
