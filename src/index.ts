import * as core from "@actions/core";
import { parseInput } from "./input";
import { downloadArtifacts } from "./download-artifacts";

async function run() {
  try {
    const input = parseInput();
    const artifacts = await downloadArtifacts(input);
    core.setOutput("downloaded_artifacts", JSON.stringify(artifacts));
    console.log(artifacts);
  } catch (error) {
    core.setFailed(String(error));
  }
}

run();
