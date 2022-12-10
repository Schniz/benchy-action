import fs from "node:fs/promises";
import path from "node:path";
import { context as github } from "@actions/github";
import * as artifactsClient from "@actions/artifact";
import type { Input } from "./input";
import * as core from "@actions/core";
import type { Artifact } from "./artifact";

export async function storeArtifact(
  value: Artifact,
  input: Pick<Input, "artifactName">
) {
  const client = artifactsClient.create();
  const filename = path.join(".benchy", `${github.sha}.json`);
  try {
    await fs.writeFile(filename, JSON.stringify(value, null, 2));
    await client.uploadArtifact(input.artifactName, [filename], process.cwd());
    core.info(`Uploaded artifact ${input.artifactName}`);
  } finally {
    await fs.rm(filename).catch(() => {});
  }
}
