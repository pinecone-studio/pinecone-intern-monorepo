/*eslint-disable*/
import { CommentLikeModel, NotificationModel } from 'apps/L1FG/instagram/backend/src/models';
import { CommentModel } from 'apps/L1FG/instagram/backend/src/models/comment.model';
import { deleteCommentLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/comment/delete-comment-like';
import { validateCommentLikeWhenDeleting } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/comment/delete-comment-like-utils/validate-comment-like-when-deleting';
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
const mockInput = {
  commentId: '12',
  postId: '34',
  ownerUserId: '56',
};
jest.mock('apps/L1FG/instagram/backend/src/models');
jest.mock('apps/L1FG/instagram/backend/src/models/comment.model');
describe('Delete comment like', () => {
  it('Should throw authorization error', async () => {
    if (!deleteCommentLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn(() => {
      throw new Error('Та нэвтэрнэ үү');
    });
    await expect(deleteCommentLike({}, { input: mockInput }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Та нэвтэрнэ үү');
  });
  it('Should catch an error', async () => {
    if (!deleteCommentLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (validateCommentLikeWhenDeleting as jest.Mock) = jest.fn();
    (CommentLikeModel.findOneAndDelete as jest.Mock).mockResolvedValue({});
    (CommentModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({});
    (NotificationModel.findOneAndDelete as jest.Mock) = jest.fn(() => {
      throw new Error('hi');
    });
    await expect(deleteCommentLike({}, { input: mockInput }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });
  it('Should successfully delete', async () => {
    if (!deleteCommentLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    (validateCommentLikeWhenDeleting as jest.Mock) = jest.fn();
    (CommentLikeModel.findOneAndDelete as jest.Mock).mockResolvedValue({
      _id: '12',
    });
    (CommentModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({});
    (NotificationModel.findOneAndDelete as jest.Mock) = jest.fn();
    const result = await deleteCommentLike({}, { input: mockInput }, { userId: '13' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '12',
    });
  });
});
