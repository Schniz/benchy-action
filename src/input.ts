import os from "node:os";
import z from "zod";
import * as core from "@actions/core";

const StringToNumber = z.string().transform((x, ctx) => {
  const num = Number(x);
  if (Number.isNaN(num)) {
    ctx.addIssue({
      code: "custom",
      message: `not a number`,
    });
    return z.NEVER;
  }
  return num;
});

const Input = z
  .object({
    artifact_name: z
      .string()
      .min(1)
      .default(`benchy-stats-${os.platform()}-${os.arch()}`),
    token: z.string().min(1),
    main_branch: z.string().min(1),
    max_commits_to_traverse: StringToNumber.pipe(
      z.number().int().positive()
    ).default("20"),
  })
  .transform((input) => ({
    artifactName: input.artifact_name,
    token: input.token,
    mainBranch: input.main_branch,
    maxCommitsToTraverse: input.max_commits_to_traverse,
  }));

export function parseInput(): z.infer<typeof Input> {
  const map: Record<keyof z.input<typeof Input>, true> = {
    artifact_name: true,
    token: true,
    main_branch: true,
    max_commits_to_traverse: true,
  };

  const data: Partial<Record<keyof z.input<typeof Input>, string>> = {};
  for (const key of Object.keys(map)) {
    const value = core.getInput(key);
    if (value !== "") {
      data[key as keyof z.input<typeof Input>] = value;
    }
  }

  return Input.parse(data);
}

export type Input = z.infer<typeof Input>;
