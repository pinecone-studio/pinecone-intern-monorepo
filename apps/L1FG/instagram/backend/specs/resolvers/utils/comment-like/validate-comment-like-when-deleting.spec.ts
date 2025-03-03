/* eslint-disable @nx/enforce-module-boundaries */
import { NotificationModel, PostModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { CommentModel } from 'apps/L1FG/instagram/backend/src/models/comment.model';
import { validateCommentLikeWhenDeleting } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/comment/delete-comment-like-utils/validate-comment-like-when-deleting';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Validate comment like when deleting', () => {
  const mockInput = {
    ownerUserId: '12',
    commentId: '34',
    userId: '56',
    postId: '78',
  };
  it('Should throw Коммент дээр зүрх дараагүй байна', async () => {
    (UserModel.findById as jest.Mock) = jest.fn().mockResolvedValue({});
    (CommentModel.findById as jest.Mock) = jest.fn().mockResolvedValue({});
    (PostModel.findById as jest.Mock) = jest.fn().mockResolvedValue({});
    (NotificationModel.findOne as jest.Mock) = jest.fn().mockResolvedValue(null);
    await expect(
      validateCommentLikeWhenDeleting({
        input: mockInput,
      })
    ).rejects.toThrow('Коммент дээр зүрх дараагүй байна');
  });
  it('Should throw Постны эзэн байхгүй байна', async () => {
    (UserModel.findById as jest.Mock) = jest.fn().mockResolvedValue(null);
    (CommentModel.findById as jest.Mock) = jest.fn().mockResolvedValue({});
    (PostModel.findById as jest.Mock) = jest.fn().mockResolvedValue({});
    (NotificationModel.findOne as jest.Mock) = jest.fn().mockResolvedValue({});
    await expect(
      validateCommentLikeWhenDeleting({
        input: mockInput,
      })
    ).rejects.toThrow('Постны эзэн байхгүй байна');
  });
  it('Should throw Коммент олдсонгүй', async () => {
    (UserModel.findById as jest.Mock) = jest.fn().mockResolvedValue({});
    (CommentModel.findById as jest.Mock) = jest.fn().mockResolvedValue(null);
    (PostModel.findById as jest.Mock) = jest.fn().mockResolvedValue({});
    (NotificationModel.findOne as jest.Mock) = jest.fn().mockResolvedValue({});
    await expect(
      validateCommentLikeWhenDeleting({
        input: mockInput,
      })
    ).rejects.toThrow('Коммент олдсонгүй');
  });
  it('Should throw пост олдсонгүй', async () => {
    (UserModel.findById as jest.Mock) = jest.fn().mockResolvedValue({});
    (CommentModel.findById as jest.Mock) = jest.fn().mockResolvedValue({});
    (PostModel.findById as jest.Mock) = jest.fn().mockResolvedValue(null);
    (NotificationModel.findOne as jest.Mock) = jest.fn().mockResolvedValue({});
    await expect(
      validateCommentLikeWhenDeleting({
        input: mockInput,
      })
    ).rejects.toThrow('пост олдсонгүй');
  });
});
