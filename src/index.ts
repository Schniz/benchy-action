import * as core from "@actions/core";
import { Input, parseInput } from "./input";
import { downloadArtifacts } from "./download-artifacts";
import { context as github } from "@actions/github";
import { Artifact } from "./artifact";
import { storeArtifact } from "./store-artifact";
import { ZodError } from "zod";
import { generateErrorMessage } from "zod-error";
import { readableZodErrorMessage } from "./readable-zod-error-message";

async function run() {
  try {
    const input = await parseInput();
    const currentArtifacts = getCurrentArtifacts(input);
    const [storedArtifacts] = await Promise.all([
      downloadArtifacts(input),
      storeArtifact(currentArtifacts, input),
    ]);

    const artifacts = [...storedArtifacts, ...currentArtifacts];

    core.setOutput("downloaded_artifacts", JSON.stringify(artifacts));
    console.log(artifacts);
  } catch (error) {
    const message =
      error instanceof ZodError
        ? readableZodErrorMessage(error)
        : String(error);
    core.setFailed(message);
    process.exitCode = 1;
  }
}

function getCurrentArtifacts(input: Pick<Input, "metrics">): Artifact[] {
  const sha = github.sha;
  const sortDate = new Date();
  return input.metrics.map((metric) => ({
    key: metric.key,
    value: metric.value,
    sha,
    sortDate,
  }));
}

run();
