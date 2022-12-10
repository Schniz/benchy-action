import z from "zod";

export const Artifact = z.object({
  sortDate: z
    .string()
    .datetime()
    .transform((x) => new Date(x)),
  sha: z.string().min(1),
  value: z.number(),
});

export type Artifact = z.infer<typeof Artifact>;
