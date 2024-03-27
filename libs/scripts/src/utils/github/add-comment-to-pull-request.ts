/* eslint-disable no-secrets/no-secrets */
/* eslint-disable camelcase */
import { handleApiError } from '../handle-errors/handle-api-error';
import { logAndThrowError } from '../handle-errors/log-and-throw-error';
import { sendMessageToTeams } from '../teams/send-message-to-teams';
import { createComment } from './create-comment';
import { getPullRequestData } from './get-pull-request-data';
import { getGithubContext, getGithubOctokit, getPullRequestNumber } from './github-utils';
import { GithubBaseType } from './types';
import { updateComment } from './update-comment';

type AddCommentToPullRequestType = {
  name: string;
  url: string | boolean;
};

const PR_CHANNEL_WEBHOOK_URL =
  'https://nestcore.webhook.office.com/webhookb2/19649155-c2ed-4a18-98e5-b64d7ccb6862@aae8fbe2-488b-49d9-b471-e4be61674a71/IncomingWebhook/85032b7fe75d4abcb3be397826baf53a/9a3f54d2-50d7-4e6c-9349-7a24da74e5b4';

export const getExistingComments = async ({ context, pullRequestNumber, octokit }: GithubBaseType) => {
  try {
    return await octokit.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pullRequestNumber,
    });
  } catch (error) {
    handleApiError('while getting existing comments', error);
  }
};

export const findExistingComment = (existingComments, key: number) => {
  const keyString = key.toString();
  return existingComments.data.find((comment) => {
    const commentText = comment.body || '';
    return commentText.includes(`${keyString}`);
  });
};

export const updateOrCreateComment = async ({
  octokit,
  context,
  pullRequestNumber,
  commentBody,
  existingComment,
}: GithubBaseType & { existingComment: { id: number } | boolean; commentBody: string }) => {
  if (existingComment) {
    await updateComment({ octokit, context, existingComment: existingComment as { id: number }, commentBody });
  } else {
    await createComment({ octokit, context, pullRequestNumber, commentBody });
  }
};

export const addCommentToPullRequest = async (projects: AddCommentToPullRequestType[]) => {
  const githubOctokit = getGithubOctokit();
  const pullRequestNumber = getPullRequestNumber();
  const githubContext = getGithubContext();

  const filteredProjects = projects.filter((project) => project !== undefined).filter(({ url }) => url);

  const commentBody = filteredProjects.map(({ name, url }) => `**${name.toLocaleUpperCase()} Preview Link:** [${url}](${url})`).join('\n');
  const comment = `${pullRequestNumber}:\n${commentBody}`;

  const teamsNotificationActions = [
    {
      description: 'Click to see the pull request',
      url: `https://github.com/pinecone-studio/pinecone-intern-monorepo/pull/${pullRequestNumber}`,
    },
  ];

  try {
    const existingComments = await getExistingComments({ octokit: githubOctokit, context: githubContext, pullRequestNumber });
    const isCommented = findExistingComment(existingComments, pullRequestNumber);
    await updateOrCreateComment({ octokit: githubOctokit, context: githubContext, existingComment: isCommented, pullRequestNumber, commentBody: comment });
    const { creator, title } = await getPullRequestData();
    await sendMessageToTeams({
      teamsWebhookUrl: PR_CHANNEL_WEBHOOK_URL,
      projects: filteredProjects,
      notificationSummary: title,
      notificationDescription: `This notification includes preview links generated during the execution of a pull request action initiated by ${creator.toLocaleUpperCase()}.`,
      clickableLinks: teamsNotificationActions,
    });
  } catch (error) {
    logAndThrowError('Error adding/updating comment to the pull request:', error);
  }
};
