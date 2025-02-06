import { CommentLikeModel } from 'apps/L1FG/instagram/backend/src/models';
import { CommentModel } from 'apps/L1FG/instagram/backend/src/models/comment.model';
import { createCommentLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/models/comment.model');
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('describe', () => {
  it('Should throw an Unauthorized error if user is not authenticated', async () => {
    if (!createCommentLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn(() => {
      throw new Error('Unauthorized');
    });

    await expect(createCommentLike({}, { input: { commentId: '123' } }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
  it('Should throw an error if creating a comment like fails', async () => {
    if (!createCommentLike) {
      return;
    }
    (authenticate as jest.Mock).mockResolvedValue('user123');
    (CommentLikeModel.create as jest.Mock).mockResolvedValue(null);

    await expect(createCommentLike({}, { input: { commentId: '123' } }, { userId: 'user123' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed comment');
  });
  it('Should create a comment like and update the like count', async () => {
    if (!createCommentLike) {
      return;
    }
    const mockLike = { _id: 'like123', userId: 'user123', commentId: '123' };
    const mockUpdatedComment = { _id: '123', likeCount: 5 };

    (authenticate as jest.Mock).mockReturnValue(null);
    (CommentLikeModel.create as jest.Mock).mockResolvedValue(mockLike);
    (CommentModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedComment);

    const result = await createCommentLike({}, { input: { commentId: '123' } }, { userId: 'user123' }, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockLike);
    expect(CommentLikeModel.create).toHaveBeenCalledTimes(2);
    expect(CommentModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { $inc: { likeCount: 1 } }, { new: true });
  });
  it('Should delete the comment like and throw an error if the like count update fails', async () => {
    if (!createCommentLike) {
      return;
    }
    const mockLike = { _id: 'like123', userId: 'user123', commentId: '123' };

    (authenticate as jest.Mock).mockReturnValue(null);
    (CommentLikeModel.create as jest.Mock).mockResolvedValue(mockLike);
    (CommentModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    (CommentLikeModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(createCommentLike({}, { input: { commentId: '123' } }, { userId: 'user123' }, {} as GraphQLResolveInfo)).rejects.toThrow('failed comment');

    expect(CommentLikeModel.findByIdAndDelete).toHaveBeenCalledWith(mockLike._id);
  });
});
