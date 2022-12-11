import z from "zod";
import { Trend } from "./input";

export const Artifact = z.object({
  key: z.string().min(1),
  sortDate: z
    .string()
    .datetime()
    .transform((x) => new Date(x)),
  sha: z.string().min(1),
  value: z.number(),
  units: z.string().optional(),
  trend: Trend.optional(),
});

export type Artifact = z.infer<typeof Artifact>;
