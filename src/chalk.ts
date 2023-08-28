import { type ChalkInstance, Chalk } from "chalk";
import { Context, Effect } from "effect";

export const tag = Context.Tag<ChalkInstance>();

export const withForcedAnsiColors = Effect.sync(() => new Chalk({ level: 2 }));
