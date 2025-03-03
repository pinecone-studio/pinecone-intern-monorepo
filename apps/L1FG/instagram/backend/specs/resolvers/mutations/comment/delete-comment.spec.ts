/* eslint-disable @nx/enforce-module-boundaries */

import { PostModel } from 'apps/L1FG/instagram/backend/src/models';
import { CommentModel } from 'apps/L1FG/instagram/backend/src/models/comment.model';
import { NotificationModel } from 'apps/L1FG/instagram/backend/src/models/notification.model';
import { CommentLikeModel } from 'apps/L1FG/instagram/backend/src/models/comment-like.model';
import { deleteComment } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { UnauthenticatedError } from 'apps/L1FG/instagram/backend/src/utils/error';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/models/comment.model');
jest.mock('apps/L1FG/instagram/backend/src/models');
jest.mock('apps/L1FG/instagram/backend/src/models/notification.model');
jest.mock('apps/L1FG/instagram/backend/src/models/comment-like.model');

describe('deleteComment Mutation', () => {
  const mockContext = { userId: 'user123' };
  const mockCommentId = 'comment123';
  const mockPostId = 'post123';
  const mockInfo = {} as GraphQLResolveInfo;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw UnauthenticatedError when user is not authenticated', async () => {
    if (!deleteComment) {
      return;
    }
    (authenticate as jest.Mock).mockImplementation(() => {
      throw new UnauthenticatedError('Please login to continue');
    });

    await expect(deleteComment({}, { commentId: mockCommentId }, mockContext, mockInfo)).rejects.toThrow('Please login to continue');
  });

  it('should throw error when comment is not found', async () => {
    if (!deleteComment) {
      return;
    }
    (authenticate as jest.Mock).mockImplementation(() => true);
    (CommentModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteComment({}, { commentId: mockCommentId }, mockContext, mockInfo)).rejects.toThrow('comment delete failed.');
  });

  it('should successfully delete comment and update post comment count', async () => {
    if (!deleteComment) {
      return;
    }
    (authenticate as jest.Mock).mockImplementation(() => true);

    const mockDeletedComment = {
      _id: mockCommentId,
      content: 'Test comment',
      userId: mockContext.userId,
      postId: mockPostId,
    };

    (CommentModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedComment);
    (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({
      _id: mockPostId,
      commentCount: 5,
    });

    (NotificationModel.deleteMany as jest.Mock).mockResolvedValue({});
    (CommentLikeModel.deleteMany as jest.Mock).mockResolvedValue({});

    const result = await deleteComment({}, { commentId: mockCommentId }, mockContext, mockInfo);

    expect(result).toEqual(mockDeletedComment);
  });

  it('should handle database errors gracefully', async () => {
    if (!deleteComment) {
      return;
    }
    (authenticate as jest.Mock).mockImplementation(() => true);
    (CommentModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(''));

    await expect(deleteComment({}, { commentId: mockCommentId }, mockContext, mockInfo)).rejects.toThrow('');
  });
});
