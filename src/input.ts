import os from "node:os";
import z from "zod";
import * as core from "@actions/core";
import { readFile } from "node:fs/promises";

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

const Metric = z.object({
  key: z.string().min(1),
  value: StringToNumber,
});

const ReadableFile = z.string().transform(async (x, ctx) => {
  try {
    return await readFile(x, "utf8");
  } catch (e) {
    ctx.addIssue({
      code: "custom",
      message: `file not readable`,
    });
    return z.NEVER;
  }
});

const ParsedJson = z.string().transform((x, ctx) => {
  try {
    return JSON.parse(x);
  } catch (e) {
    ctx.addIssue({
      code: "custom",
      message: `invalid JSON: ${e}`,
    });
    return z.NEVER;
  }
});

const BenchmarkInput = Metric.or(
  z.object({
    json: ParsedJson.pipe(z.array(Metric)),
  })
)
  .or(
    z.object({
      input_file: ReadableFile.pipe(ParsedJson).pipe(z.array(Metric)),
    })
  )
  .transform((x): { input: z.infer<typeof Metric>[] } => {
    return {
      input: (() => {
        if ("input_file" in x) {
          return x.input_file;
        } else if ("json" in x) {
          return x.json;
        }
        return [x];
      })(),
    };
  });

type BenchmarkInput = z.infer<typeof BenchmarkInput>;

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
  .and(BenchmarkInput)
  .transform((input) => ({
    artifactName: input.artifact_name,
    token: input.token,
    mainBranch: input.main_branch,
    maxCommitsToTraverse: input.max_commits_to_traverse,
    metrics: input.input,
  }));

export async function parseInput(): Promise<z.infer<typeof Input>> {
  const data: Partial<Record<keyof z.input<typeof Input>, string>> = {};
  const keys = [
    "artifact_name",
    "token",
    "main_branch",
    "max_commits_to_traverse",
    "json",
    "input_file",
    "key",
    "value",
  ];
  for (const key of keys) {
    const value = core.getInput(key);
    if (value !== "") {
      data[key as keyof z.input<typeof Input>] = value;
    }
  }

  return Input.parseAsync(data);
}

export type Input = z.infer<typeof Input>;
