import type { Input } from "./input";
import { createHash } from "node:crypto";
import { getOctokit, context as github } from "@actions/github";
import * as core from "@actions/core";

type Octokit = ReturnType<typeof getOctokit>;

function sha1(str: string): string {
  return createHash("sha1").update(str).digest("hex");
}

export async function commentOnGitHub(
  input: Pick<Input, "artifactName" | "token">,
  resultsTable: string
): Promise<void> {
  const { artifactName } = input;
  const octokit = getOctokit(input.token);
  const magicComment = `<!-- benchy-stats-comment:${sha1(artifactName)} -->`;

  const commentToUpdate = await findCommentToUpdate({ octokit, magicComment });
  const title = `# Benchmarks for ${github.sha}`;
  const comment = [title, resultsTable, magicComment].join("\n\n");

  if (commentToUpdate) {
    core.debug(`Updating comment ${commentToUpdate.id}`);
    await updateComment({ octokit, commentToUpdate, comment });
  } else {
    core.debug(`Posting a new comment`);
    await postComment({ octokit, comment });
  }
}

async function findCommentToUpdate(params: {
  octokit: Octokit;
  magicComment: string;
}): Promise<null | { id: number }> {
  if (!github.issue.number) {
    return null;
  }

  const iterator = params.octokit.paginate.iterator(
    params.octokit.rest.issues.listComments,
    {
      owner: github.repo.owner,
      repo: github.repo.repo,
      issue_number: github.issue.number,
    }
  );

  for await (const response of iterator) {
    for (const comment of response.data) {
      if (comment?.body?.includes(params.magicComment)) {
        return { id: comment.id };
      }
    }
  }

  return null;
}

async function updateComment(params: {
  octokit: Octokit;
  commentToUpdate: { id: number };
  comment: string;
}) {
  await params.octokit.rest.issues.updateComment({
    owner: github.repo.owner,
    repo: github.repo.repo,
    comment_id: params.commentToUpdate.id,
    body: params.comment,
  });
}

async function postComment(params: { octokit: Octokit; comment: string }) {
  await params.octokit.rest.issues.createComment({
    owner: github.repo.owner,
    repo: github.repo.repo,
    issue_number: github.issue.number,
    body: params.comment,
  });
}
