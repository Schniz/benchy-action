import { getOctokit, context as github } from "@actions/github";
import type { Input } from "./input";
import fetch from "node-fetch";
import * as core from "@actions/core";

type Octokit = ReturnType<typeof getOctokit>;

export async function downloadArtifacts(
  opts: Pick<
    Input,
    "artifactName" | "githubToken" | "mainBranch" | "maxCommitsToTraverse"
  >
) {
  const octokit = getOctokit(opts.githubToken);
  const urls$: Promise<string>[] = [];
  for await (const url of findAllArtifacts(octokit, opts)) {
    const endpoint = octokit.rest.actions.downloadArtifact.endpoint({
      owner: github.repo.owner,
      repo: github.repo.repo,
      artifact_id: url,
      archive_format: "zip",
    });

    const response$ = fetch(endpoint.url, {
      method: endpoint.method,
      body: endpoint.body,
      headers: {
        authorization: `token ${opts.githubToken}`,
        ...endpoint.headers,
      },
    }).then((x) => {
      if (!x.ok) {
        throw new Error(`Failed to request ${JSON.stringify(endpoint)}`);
      }
      const location = x.headers.get("location");
      if (!location) {
        throw new Error(
          `Request ${JSON.stringify(endpoint)} did not return a location header`
        );
      }
      return location;
    });
    urls$.push(response$);
  }

  return Promise.all(urls$);
}

async function* findAllArtifacts(
  octokit: Octokit,
  body: Pick<Input, "mainBranch" | "artifactName" | "maxCommitsToTraverse">
): AsyncGenerator<number, void, void> {
  const workflowsIterator = octokit.paginate.iterator(
    octokit.rest.actions.listArtifactsForRepo,
    {
      owner: github.repo.owner,
      repo: github.repo.repo,
      branch: body.mainBranch,
    }
  );

  const urls: number[] = [];
  const visitedCommits = new Set<string>();

  yield* (async function* () {
    for await (const workflowsResponse of workflowsIterator) {
      for (const resp of workflowsResponse.data) {
        if (resp.workflow_run?.head_sha) {
          visitedCommits.add(resp.workflow_run.head_sha);
        }

        if (resp.name === body.artifactName) {
          urls.push(resp.id);
          yield resp.id;

          if (urls.length > 10) {
            return;
          }
        }
      }

      if (visitedCommits.size > body.maxCommitsToTraverse) {
        core.debug("went through too many commits");
        return;
      }
    }
  })();
}
