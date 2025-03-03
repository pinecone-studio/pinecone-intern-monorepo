import { NotificationModel, PostModel } from '../../../../src/models';
import { CommentModel } from '../../../../src/models/comment.model';
import { createComment } from '../../../../src/resolvers/mutations';
import { authenticate } from '../../../../src/utils/authenticate';

import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/models/comment.model');
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Create comment', () => {
  it('Should throw unauthenticated error', async () => {
    if (!createComment) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn(() => {
      throw new Error('Та нэвтэрнэ үү');
    });
    await expect(
      createComment(
        {},
        {
          input: {
            postId: '123',
            comment: 'asdf',
            ownerId: '321',
          },
        },
        { userId: 'adf' },
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Та нэвтэрнэ үү');
  });
  it('Should throw an error when trying to create a comment', async () => {
    if (!createComment) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValue(null);
    const mockCommentModelCreate = jest.fn().mockImplementation(() => {
      return null;
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    (CommentModel.create as jest.Mock) = mockCommentModelCreate;
    await expect(
      createComment(
        {},
        {
          input: {
            postId: '123',
            comment: 'asdf',
            ownerId: '321',
          },
        },
        { userId: 'adf' },
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Failed Comment');
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith('adf');
    expect(mockCommentModelCreate).toHaveBeenCalledTimes(1);
    expect(mockCommentModelCreate).toHaveBeenCalledWith({ userId: 'adf', postId: '123', comment: 'asdf' });
  });
  it('Should create a comment and update the post successfully', async () => {
    if (!createComment) {
      return;
    }
    const mockComment = { _id: 'comment123', userId: 'user123', postId: '123', comment: 'Test Comment' };
    const mockUpdatedPost = { _id: '123', commentCount: 5 };
    // contentCommentId: comments._id,
    // contentPostId: postId,
    // ownerId,
    // categoryType: 'POST_COMMENT',
    // userId,

    (authenticate as jest.Mock).mockReturnValue(null);
    (CommentModel.create as jest.Mock).mockResolvedValue(mockComment);
    (NotificationModel.create as jest.Mock).mockResolvedValue({ ownerId: '321', userId: 'user123', contentPostId: '123', contentCommentId: '11', categoryType: 'POST_COMMENT' });
    (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedPost);

    const result = await createComment({}, { input: { postId: '123', comment: 'Test Comment', ownerId: '321' } }, { userId: 'user123' }, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockComment);
    expect(CommentModel.create).toHaveBeenCalledTimes(2);
    expect(PostModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(PostModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { $inc: { commentCount: 1 } }, { new: true });
  });
  it('Should delete the comment and throw CreationError if post update fails', async () => {
    if (!createComment) {
      return;
    }
    const mockComment = { _id: 'comment123', userId: 'user123', postId: 'post123', comment: 'Test Comment' };

    (authenticate as jest.Mock).mockReturnValue(null);
    (CommentModel.create as jest.Mock).mockResolvedValue(mockComment);
    (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null); // Simulating update failure
    (CommentModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null); // Simulating successful rollback

    await expect(createComment({}, { input: { postId: 'post123', comment: 'Test Comment', ownerId: '321' } }, { userId: 'user123' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed comment');

    expect(CommentModel.create).toHaveBeenCalledTimes(3);
    expect(PostModel.findByIdAndUpdate).toHaveBeenCalledTimes(2);
    expect(PostModel.findByIdAndUpdate).toHaveBeenCalledWith('post123', { $inc: { commentCount: 1 } }, { new: true });

    expect(CommentModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    expect(CommentModel.findByIdAndDelete).toHaveBeenCalledWith(mockComment._id);
  });

  it('Should create a comment and update the post successfully', async () => {
    if (!createComment) {
      return;
    }
    const mockComment = { _id: 'comment123', userId: 'user123', postId: '123', comment: 'Test Comment' };
    const mockUpdatedPost = { _id: '123', commentCount: 5 };

    (authenticate as jest.Mock).mockReturnValue(null);
    (CommentModel.create as jest.Mock).mockResolvedValue(mockComment);
    (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedPost);

    const result = await createComment({}, { input: { postId: '123', comment: 'Test Comment', ownerId: '321' } }, { userId: 'user123' }, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockComment);
    expect(CommentModel.create).toHaveBeenCalledTimes(4);
    expect(PostModel.findByIdAndUpdate).toHaveBeenCalledTimes(3);
    expect(PostModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { $inc: { commentCount: 1 } }, { new: true });
  });
});
