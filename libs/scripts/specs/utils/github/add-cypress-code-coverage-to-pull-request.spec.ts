import * as addCommentToPullRequest from '../../../src/utils/github/add-comment-to-pull-request';
import { addCypressCodeCoverageToPullRequest } from '../../../src/utils/github/add-cypress-code-coverage-to-pull-request';
import * as githubUtils from '../../../src//utils/github/github-utils';
import * as logAndThrowError from '../../../src/utils/handle-errors/log-and-throw-error';

jest.mock('@actions/github', () => ({
  getOctokit: jest.fn(),
}));

describe('addCypressCodeCoverageToPullRequest', () => {
  it('Should add code report to pull request', async () => {
    const mockGetGithubOctokit = jest.spyOn(githubUtils, 'getGithubOctokit');
    mockGetGithubOctokit.mockImplementation();
    const mockGetPullRequestNumber = jest.spyOn(githubUtils, 'getPullRequestNumber');
    mockGetPullRequestNumber.mockReturnValueOnce(12);
    const mockGetGithubContext = jest.spyOn(githubUtils, 'getGithubContext');
    mockGetGithubContext.mockImplementation();

    const mockGetExistingComments = jest.spyOn(addCommentToPullRequest, 'getExistingComments');
    mockGetExistingComments.mockImplementation();
    const mockFindExistingComment = jest.spyOn(addCommentToPullRequest, 'findExistingComment');
    mockFindExistingComment.mockImplementation();
    const mockUpdateOrCreateComment = jest.spyOn(addCommentToPullRequest, 'updateOrCreateComment');
    mockUpdateOrCreateComment.mockImplementation();

    await addCypressCodeCoverageToPullRequest({ commentBody: 'body', path: '/' });
  });

  it('Should throw error when code report to pull request', async () => {
    const mockError = new Error('Mock error');
    const mockGetGithubOctokit = jest.spyOn(githubUtils, 'getGithubOctokit');
    mockGetGithubOctokit.mockImplementation();
    const mockGetPullRequestNumber = jest.spyOn(githubUtils, 'getPullRequestNumber');
    mockGetPullRequestNumber.mockReturnValueOnce(12);
    const mockGetGithubContext = jest.spyOn(githubUtils, 'getGithubContext');
    mockGetGithubContext.mockImplementation();

    const mockGetExistingComments = jest.spyOn(addCommentToPullRequest, 'getExistingComments');
    mockGetExistingComments.mockRejectedValue(mockError);
    const mockFindExistingComment = jest.spyOn(addCommentToPullRequest, 'findExistingComment');
    mockFindExistingComment.mockImplementation();
    const mockUpdateOrCreateComment = jest.spyOn(addCommentToPullRequest, 'updateOrCreateComment');
    mockUpdateOrCreateComment.mockImplementation();

    const mockLogAndThrowError = jest.spyOn(logAndThrowError, 'logAndThrowError');
    mockLogAndThrowError.mockImplementation();

    await addCypressCodeCoverageToPullRequest({ commentBody: 'body', path: '/' });

    expect(mockLogAndThrowError).toHaveBeenCalled();
  });
});
