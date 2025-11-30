import { Chalk as ChalkClass } from "chalk";
import { Effect } from "effect";

export class Chalk extends Effect.Service<Chalk>()("bnz-action/chalk", {
  sync: () => new ChalkClass({ level: 2 }),
  accessors: true,
}) {}
