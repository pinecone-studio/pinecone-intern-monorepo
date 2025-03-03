/* eslint-disable @nx/enforce-module-boundaries */
import { CommentLikeModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { CommentModel } from 'apps/L1FG/instagram/backend/src/models/comment.model';
import { validateCommentlikeCommentOwneruser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/comment/create-comment-like-utils/validate-commentlike-comment-owneruser';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Validate commentlike comment owner user', () => {
  it('Should throw коммент дээр зүрх дарсан байна', async () => {
    const mockCommentLikeModelFindOne = jest.fn().mockResolvedValueOnce({});
    const mockCommentModelFindById = jest.fn().mockResolvedValueOnce({});
    const mockUserModelFindById = jest.fn().mockResolvedValueOnce({});
    (CommentLikeModel.findOne as jest.Mock) = mockCommentLikeModelFindOne;
    (CommentModel.findById as jest.Mock) = mockCommentModelFindById;
    (UserModel.findById as jest.Mock) = mockUserModelFindById;
    await expect(
      validateCommentlikeCommentOwneruser({
        input: {
          ownerUserId: '12',
          commentId: '34',
          userId: '56',
        },
      })
    ).rejects.toThrow('коммент дээр зүрх дарсан байна');
  });
  it('Should throw коммент байхгүй байна', async () => {
    const mockCommentLikeModelFindOne = jest.fn().mockResolvedValueOnce(null);
    const mockCommentModelFindById = jest.fn().mockResolvedValueOnce(null);
    const mockUserModelFindById = jest.fn().mockResolvedValueOnce({});
    (CommentLikeModel.findOne as jest.Mock) = mockCommentLikeModelFindOne;
    (CommentModel.findById as jest.Mock) = mockCommentModelFindById;
    (UserModel.findById as jest.Mock) = mockUserModelFindById;
    await expect(
      validateCommentlikeCommentOwneruser({
        input: {
          ownerUserId: '12',
          commentId: '34',
          userId: '56',
        },
      })
    ).rejects.toThrow('коммент байхгүй байна');
  });
  it('Should throw постны эзэмшигч байхгүй байна', async () => {
    const mockCommentLikeModelFindOne = jest.fn().mockResolvedValueOnce(null);
    const mockCommentModelFindById = jest.fn().mockResolvedValueOnce({});
    const mockUserModelFindById = jest.fn().mockResolvedValueOnce(null);
    (CommentLikeModel.findOne as jest.Mock) = mockCommentLikeModelFindOne;
    (CommentModel.findById as jest.Mock) = mockCommentModelFindById;
    (UserModel.findById as jest.Mock) = mockUserModelFindById;
    await expect(
      validateCommentlikeCommentOwneruser({
        input: {
          ownerUserId: '12',
          commentId: '34',
          userId: '56',
        },
      })
    ).rejects.toThrow('постны эзэмшигч байхгүй байна');
  });
});
