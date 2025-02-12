/*eslint-disable*/

import { NotificationModel, PostLikeModal, PostModel } from 'apps/L1FG/instagram/backend/src/models';
import { deletePostLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { validatePostlikePostAndNotification } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/delete-post-like-utils/validate-postlike-post-and-notification';
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');
jest.mock('apps/L1FG/instagram/backend/src/models');
jest.mock('apps/L1FG/instagram/backend/src/resolvers/mutations/post/delete-post-like-utils/validate-postlike-post-and-notification');
describe('delete post like', () => {
  it('Should throw authentication error', async () => {
    if (!deletePostLike) {
      return;
    }
    (authenticate as jest.Mock).mockImplementation(() => {
      throw new Error('Та нэвтэрнэ үү');
    });
    const input = {
      ownerUserId: '3',
      postId: '2',
    };
    await expect(deletePostLike({}, { input: input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Та нэвтэрнэ үү');
  });
  it('Should throw пост олдсонгүй', async () => {
    if (!deletePostLike) {
      return;
    }
    (authenticate as jest.Mock).mockResolvedValue(null);
    const mockValidatePostlikePostAndNotification = jest.fn(() => {
      throw new Error('пост олдсонгүй');
    });
    (validatePostlikePostAndNotification as jest.Mock) = mockValidatePostlikePostAndNotification;
    const input = {
      ownerUserId: '3',
      postId: '2',
    };
    await expect(
      deletePostLike(
        {},
        {
          input: input,
        },
        { userId: '12' },
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('пост олдсонгүй');
  });

  it('Should throw error ', async () => {
    if (!deletePostLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    const mockValidatePostlikePostAndNotification = jest.fn();
    (validatePostlikePostAndNotification as jest.Mock) = mockValidatePostlikePostAndNotification;
    (PostLikeModal.findOneAndDelete as jest.Mock).mockResolvedValueOnce({
      _id: '23',
      userId: '45',
      postId: '67',
    });
    (PostModel.findByIdAndUpdate as jest.Mock) = jest.fn(() => {
      throw new Error('hi this error');
    });
    (NotificationModel.findOneAndDelete as jest.Mock) = jest.fn();

    const input = {
      ownerUserId: '3',
      postId: '2',
    };
    await expect(
      deletePostLike(
        {},
        {
          input: input,
        },
        { userId: '12' },
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Server error');
  });

  it('Should successfully delete post like ', async () => {
    if (!deletePostLike) {
      return;
    }
    (authenticate as jest.Mock) = jest.fn();
    const mockValidatePostlikePostAndNotification = jest.fn();
    (validatePostlikePostAndNotification as jest.Mock) = mockValidatePostlikePostAndNotification;
    (PostLikeModal.findOneAndDelete as jest.Mock).mockResolvedValueOnce({
      _id: '23',
      userId: '45',
      postId: '67',
    });
    (PostModel.findByIdAndUpdate as jest.Mock) = jest.fn();
    (NotificationModel.findOneAndDelete as jest.Mock) = jest.fn();

    const input = {
      ownerUserId: '3',
      postId: '2',
    };
    const result = await deletePostLike(
      {},
      {
        input: input,
      },
      { userId: '12' },
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual({
      _id: '23',
      userId: '45',
      postId: '67',
    });
  });
});
