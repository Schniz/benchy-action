import z from "zod";

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

export const Input = z
  .object({
    artifact_name: z.string().min(1),
    github_token: z.string().min(1),
    main_branch: z.string().min(1),
    max_commits_to_traverse: StringToNumber.pipe(
      z.number().int().positive()
    ).default("20"),
  })
  .transform((input) => ({
    artifactName: input.artifact_name,
    githubToken: input.github_token,
    mainBranch: input.main_branch,
    maxCommitsToTraverse: input.max_commits_to_traverse,
  }));

export type Input = z.infer<typeof Input>;
