import fs from "node:fs/promises";
import path from "node:path";
import { context as github } from "@actions/github";
import * as artifactsClient from "@actions/artifact";
import type { Input } from "./input";
import * as core from "@actions/core";
import type { Artifact } from "./artifact";
import os from "node:os";

export async function storeArtifact(
  value: Artifact[],
  input: Pick<Input, "artifactName" | "mainBranch">
) {
  const client = artifactsClient.create();
  const filename = `${github.sha}.json`;
  const tmpdir = path.join(os.tmpdir(), `benchy-artifact-${Date.now()}`);

  await fs.mkdir(tmpdir, { recursive: true });
  const fullpath = path.join(tmpdir, filename);
  await fs.writeFile(fullpath, JSON.stringify(value, null, 2));
  await client.uploadArtifact(input.artifactName, [fullpath], tmpdir);
  core.info(`Uploaded artifact ${input.artifactName}`);
}
