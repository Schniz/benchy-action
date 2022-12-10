import { getOctokit, context as github } from "@actions/github";
import type { Input } from "./input";
import * as core from "@actions/core";
import { unzip } from "unzipit";
import { Artifact } from "./artifact";

type Octokit = ReturnType<typeof getOctokit>;

export async function downloadArtifacts(
  opts: Pick<
    Input,
    "artifactName" | "token" | "mainBranch" | "maxCommitsToTraverse"
  >
): Promise<Artifact[]> {
  const octokit = getOctokit(opts.token);
  const urls$: Promise<Artifact[] | undefined>[] = [];
  for await (const url of findAllArtifacts(octokit, opts)) {
    urls$.push(
      (async () => {
        const { data } = await octokit.rest.actions.downloadArtifact({
          owner: github.repo.owner,
          repo: github.repo.repo,
          artifact_id: url,
          archive_format: "zip",
        });

        const { entries } = await unzip(data as ArrayBuffer);
        for (const [_name, entry] of Object.entries(entries)) {
          try {
            return Artifact.array().parse(await entry.json());
          } catch {}
        }
        core.warning(`no valid json file found in artifact ${url}`);
        return undefined;
      })()
    );
  }

  const urls = await Promise.all(urls$);
  return urls
    .filter((url): url is Artifact[] => url !== undefined)
    .flat()
    .sort((a, z) => {
      return new Date(a.sortDate).getTime() - new Date(z.sortDate).getTime();
    });
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
        if (resp.workflow_run?.head_sha === github.sha) {
          continue;
        }

        if (resp.workflow_run?.head_branch !== body.mainBranch) {
          continue;
        }

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
