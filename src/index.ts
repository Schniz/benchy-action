import * as core from "@actions/core";
import { Input, parseInput } from "./input";
import { downloadArtifacts } from "./download-artifacts";
import { context as github } from "@actions/github";
import { Artifact } from "./artifact";
import { storeArtifact } from "./store-artifact";

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
    core.setFailed(String(error));
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
