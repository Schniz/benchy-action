import z from "zod";

export const Artifact = z.object({
  key: z.string().min(1),
  sortDate: z
    .string()
    .datetime()
    .transform((x) => new Date(x)),
  sha: z.string().min(1),
  value: z.number(),
});

export type Artifact = z.infer<typeof Artifact>;
