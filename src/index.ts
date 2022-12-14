import * as core from "@actions/core";
import { Input, parseInput } from "./input";
import { downloadArtifacts } from "./download-artifacts";
import { context as github } from "@actions/github";
import { Artifact } from "./artifact";
import { storeArtifact } from "./store-artifact";
import { ZodError } from "zod";
import { readableZodErrorMessage } from "./readable-zod-error-message";
import { pick, groupBy } from "./collections";
import { getComparisonTable, stringifyTag } from "./comment";
import { commentOnGitHub } from "./comment-on-github";

async function run() {
  try {
    const input = await parseInput(core);
    const currentArtifacts = getCurrentArtifacts(input);
    const [storedArtifacts] = await Promise.all([
      downloadArtifacts(input),
      storeArtifact(currentArtifacts, input),
    ]);

    const artifacts = [...storedArtifacts, ...currentArtifacts];
    const keys = [...new Set(currentArtifacts.map((a) => a.key))];
    const keyed = pick(groupBy(artifacts, "key"), keys);

    const resultsTable = stringifyTag(getComparisonTable({ artifacts: keyed }));

    core.setOutput("downloaded_artifacts", JSON.stringify(keyed));
    core.setOutput("results_table", resultsTable);

    if (input.shouldComment) {
      await commentOnGitHub(input, resultsTable);
    }
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
    ...metric,
    sha,
    sortDate,
  }));
}

run();
