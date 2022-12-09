import z from "zod";
import * as core from "@actions/core";
import { Input } from "./input";
import { downloadArtifacts } from "./download-artifacts";

async function run() {
  try {
    const input = Input.parse({
      artifact_name: core.getInput("artifact_name"),
      github_token: core.getInput("github_token"),
      main_branch: core.getInput("main_branch"),
      max_commits_to_traverse: core.getInput("max_commits_to_traverse"),
    } satisfies z.input<typeof Input>);

    const urls = await downloadArtifacts(input);
    core.setOutput("artifact_urls", JSON.stringify(urls));

    console.log(urls);
  } catch (error) {
    core.setFailed(String(error));
  }
}

run();
