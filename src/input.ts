import os from "node:os";
import z from "zod";
import * as core from "@actions/core";
import { readFile } from "node:fs/promises";
import { create } from "@actions/glob";

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

export const Trend = z.enum(["lower-is-better", "higher-is-better"]);

export const Metric = z.object({
  key: z.string().min(1),
  value: z.number().or(StringToNumber),
  units: z.string().optional(),
  trend: z.string().pipe(Trend.optional()),
});
export type Metric = z.infer<typeof Metric>;

const GlobbedFiles = z.string().transform(async (x, ctx) => {
  try {
    const globber = await create(x, { matchDirectories: false });
    const files = await globber.glob();
    return Promise.all(files.map((f) => readFile(f, "utf-8")));
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
      input_file: GlobbedFiles.pipe(z.array(ParsedJson))
        .pipe(z.array(z.array(Metric)))
        .transform((x) => x.flat()),
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
    should_comment: z.boolean().default(true),
  })
  .and(BenchmarkInput)
  .transform((input) => ({
    artifactName: input.artifact_name,
    token: input.token,
    mainBranch: input.main_branch,
    maxCommitsToTraverse: input.max_commits_to_traverse,
    metrics: input.input,
    shouldComment: input.should_comment,
  }));

export async function parseInput({
  getInput,
  getBooleanInput,
}: Pick<typeof core, "getInput" | "getBooleanInput">): Promise<
  z.infer<typeof Input>
> {
  const getBool = (name: string): boolean | undefined => {
    try {
      return getBooleanInput(name);
    } catch (e) {
      return undefined;
    }
  };

  const getString = (name: string): string | undefined => {
    return getInput(name) || undefined;
  };

  return Input.parseAsync({
    artifact_name: getString("artifact_name"),
    token: getString("token"),
    main_branch: getString("main_branch"),
    max_commits_to_traverse: getString("max_commits_to_traverse"),
    input_file: getString("input_file"),
    units: getString("units"),
    json: getString("json"),
    key: getString("key"),
    value: getString("value"),
    trend: getString("trend"),
    should_comment: getBool("should_comment") ?? true,
  });
}

export type Input = z.infer<typeof Input>;
