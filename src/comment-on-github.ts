import type { Input } from "./input";
import { createHash } from "node:crypto";
import { getOctokit, context as github } from "@actions/github";
import * as core from "@actions/core";

type Octokit = ReturnType<typeof getOctokit>;

export async function commentOnGitHub(
  input: Pick<Input, "artifactName" | "token">,
  resultsTable: string
): Promise<void> {
  const { artifactName } = input;
  const octokit = getOctokit(input.token);
  const magicComment = `<!-- benchy-stats-comment:${sha1(artifactName)} -->`;

  const title = `# Benchmarks for ${github.sha}`;
  const comment = [title, resultsTable, magicComment].join("\n\n");

  const updater = github.issue?.number
    ? await getIssueCommentUpdater({ magicComment, octokit })
    : await getCommitCommentUpdater({ magicComment, octokit });
  await updater(comment);
}

type Updater = (comment: string) => Promise<void>;

async function getIssueCommentUpdater(params: {
  octokit: Octokit;
  magicComment: string;
}): Promise<Updater> {
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
        const id = comment.id;
        return (comment) => {
          return updateIssueComment({
            comment,
            commentToUpdate: { id },
            octokit: params.octokit,
          });
        };
      }
    }
  }

  return (comment) => postIssueComment({ comment, octokit: params.octokit });
}

async function getCommitCommentUpdater(params: {
  octokit: Octokit;
  magicComment: string;
}): Promise<Updater> {
  const iterator = params.octokit.paginate.iterator(
    params.octokit.rest.repos.listCommentsForCommit,
    {
      owner: github.repo.owner,
      repo: github.repo.repo,
      commit_sha: github.sha,
    }
  );

  for await (const response of iterator) {
    for (const comment of response.data) {
      if (comment?.body?.includes(params.magicComment)) {
        // return { id: comment.id };
        const id = comment.id;
        return (comment) => {
          return updateCommitComment({
            comment,
            commentToUpdate: { id },
            octokit: params.octokit,
          });
        };
      }
    }
  }

  return (comment) => postCommitComment({ comment, octokit: params.octokit });
}

async function updateIssueComment(params: {
  octokit: Octokit;
  commentToUpdate: { id: number };
  comment: string;
}) {
  core.debug(
    `Updating comment ${params.commentToUpdate.id} on issue ${github.issue.number}`
  );
  await params.octokit.rest.issues.updateComment({
    owner: github.repo.owner,
    repo: github.repo.repo,
    comment_id: params.commentToUpdate.id,
    body: params.comment,
  });
}

async function postIssueComment(params: { octokit: Octokit; comment: string }) {
  core.debug(`Posting issue comment on issue ${github.issue.number}`);
  await params.octokit.rest.issues.createComment({
    owner: github.repo.owner,
    repo: github.repo.repo,
    issue_number: github.issue.number,
    body: params.comment,
  });
}

async function postCommitComment(params: {
  octokit: Octokit;
  comment: string;
}) {
  core.debug(`Posting commit comment on commit ${github.sha}`);
  await params.octokit.rest.repos.createCommitComment({
    owner: github.repo.owner,
    repo: github.repo.repo,
    commit_sha: github.sha,
    body: params.comment,
  });
}

async function updateCommitComment(params: {
  octokit: Octokit;
  commentToUpdate: { id: number };
  comment: string;
}) {
  core.debug(
    `Updating comment ${params.commentToUpdate.id} on commit ${github.sha}`
  );
  await params.octokit.rest.repos.updateCommitComment({
    owner: github.repo.owner,
    repo: github.repo.repo,
    comment_id: params.commentToUpdate.id,
    body: params.comment,
  });
}

function sha1(str: string): string {
  return createHash("sha1").update(str).digest("hex");
}
