import { logAndThrowError } from '../handle-errors/log-and-throw-error';
import { findExistingComment, getExistingComments, updateOrCreateComment } from './add-comment-to-pull-request';
import { getGithubContext, getGithubOctokit, getPullRequestNumber } from './github-utils';

export const addCypressCodeCoverageToPullRequest = async ({ path, commentBody }: { path: string; commentBody: string }) => {
  const githubOctokit = getGithubOctokit();
  const pullRequestNumber = getPullRequestNumber();
  const githubContext = getGithubContext();

  const pullRequestKey = `${pullRequestNumber}-code coverage report for ${path}`;

  const comment = `${pullRequestKey}:\n${commentBody}`;

  try {
    const existingComments = await getExistingComments({ octokit: githubOctokit, context: githubContext, pullRequestNumber });
    const isCommented = findExistingComment(existingComments, pullRequestKey);
    await updateOrCreateComment({ octokit: githubOctokit, context: githubContext, existingComment: isCommented, pullRequestNumber, commentBody: comment });
  } catch (error) {
    logAndThrowError('Error while adding/updating code coverage report to the pull request:', error);
  }
};
