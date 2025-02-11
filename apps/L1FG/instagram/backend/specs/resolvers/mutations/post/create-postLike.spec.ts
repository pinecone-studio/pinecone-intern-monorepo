/* eslint-disable max-lines */
import { createPostLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
// eslint-disable-next-line no-unused-vars
import { checkPostLikeExists } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-like-utils/check-post-like-exists';
// eslint-disable-next-line no-unused-vars
import { makePostLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-like-utils/make-post-like';
// eslint-disable-next-line no-unused-vars
import { makePostLikeNotification } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-like-utils/make-post-like-notification';
// eslint-disable-next-line no-unused-vars
import { updatePostLike } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-like-utils/update-post-like';
// eslint-disable-next-line no-unused-vars
import { validateUserOwnerAndPost } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-like-utils/validate-user-owner-and-post';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/resolvers/mutations/post/create-post-like-utils/check-post-like-exists');
describe('Create post like', () => {
  it('Should throw unauthenticated error', async () => {
    if (!createPostLike) {
      return;
    }
    const input = { postId: '2', ownerUserId: '3' };
    await expect(createPostLike({}, { input: input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Та нэвтэрнэ үү');
  });
  it('Should throw Постон дээр зүрх дарсан байна', async () => {
    if (!createPostLike) {
      return;
    }
    const mockCheckPostLikeExists = jest.fn(() => {
      throw new Error('Постон дээр зүрх дарсан байна');
    });
    (checkPostLikeExists as jest.Mock) = mockCheckPostLikeExists;
    const input = { postId: '2', ownerUserId: '3' };
    await expect(createPostLike({}, { input: input }, { userId: '1' }, {} as GraphQLResolveInfo)).rejects.toThrow('Постон дээр зүрх дарсан байна');
    expect(mockCheckPostLikeExists).toHaveBeenCalledTimes(1);
  });
  it('Should throw хэрэглэгч олдсонгүй', async () => {
    if (!createPostLike) {
      return;
    }
    const mockCheckPostLikeExists = jest.fn(() => null);
    (checkPostLikeExists as jest.Mock) = mockCheckPostLikeExists;
    const mockValidateUserOwnerAndPost = jest.fn(() => {
      throw new Error('хэрэглэгч олдсонгүй');
    });
    (validateUserOwnerAndPost as jest.Mock) = mockValidateUserOwnerAndPost;
    const input = { postId: '2', ownerUserId: '3' };
    await expect(createPostLike({}, { input: input }, { userId: '1' }, {} as GraphQLResolveInfo)).rejects.toThrow('хэрэглэгч олдсонгүй');
    expect(mockCheckPostLikeExists).toHaveBeenCalledTimes(1);
    expect(mockValidateUserOwnerAndPost).toHaveBeenCalledTimes(1);
  });
  it('Should throw постны эзэмшигч олдсонгүй', async () => {
    if (!createPostLike) {
      return;
    }
    const mockCheckPostLikeExists = jest.fn(() => null);
    (checkPostLikeExists as jest.Mock) = mockCheckPostLikeExists;
    const mockValidateUserOwnerAndPost = jest.fn().mockImplementationOnce(() => {
      throw new Error('постны эзэмшигч олдсонгүй');
    });
    (validateUserOwnerAndPost as jest.Mock) = mockValidateUserOwnerAndPost;
    const input = { postId: '2', ownerUserId: '3' };
    await expect(createPostLike({}, { input: input }, { userId: '1' }, {} as GraphQLResolveInfo)).rejects.toThrow('постны эзэмшигч олдсонгүй');
    expect(mockCheckPostLikeExists).toHaveBeenCalledTimes(1);
    expect(mockValidateUserOwnerAndPost).toHaveBeenCalledTimes(1);
  });
  it('Should throw пост олдсонгүй', async () => {
    if (!createPostLike) {
      return;
    }
    const mockCheckPostLikeExists = jest.fn(() => null);
    (checkPostLikeExists as jest.Mock) = mockCheckPostLikeExists;
    const mockValidateUserOwnerAndPost = jest.fn().mockImplementationOnce(() => {
      throw new Error('пост олдсонгүй');
    });
    (validateUserOwnerAndPost as jest.Mock) = mockValidateUserOwnerAndPost;
    const input = { postId: '2', ownerUserId: '3' };
    await expect(createPostLike({}, { input: input }, { userId: '1' }, {} as GraphQLResolveInfo)).rejects.toThrow('пост олдсонгүй');
    expect(mockCheckPostLikeExists).toHaveBeenCalledTimes(1);
    expect(mockValidateUserOwnerAndPost).toHaveBeenCalledTimes(1);
  });
  it('Should throw Постон дээр зүрх дарахад алдаа гарлаа', async () => {
    if (!createPostLike) {
      return;
    }
    const mockCheckPostLikeExists = jest.fn(() => null);
    const mockValidateUserOwnerAndPost = jest.fn(() => null);
    const mockMakePostLike = jest.fn(() => {
      throw new Error('Постон дээр зүрх дарахад алдаа гарлаа');
    });
    (checkPostLikeExists as jest.Mock) = mockCheckPostLikeExists;
    (validateUserOwnerAndPost as jest.Mock) = mockValidateUserOwnerAndPost;
    (makePostLike as jest.Mock) = mockMakePostLike;
    const input = { postId: '2', ownerUserId: '3' };
    await expect(createPostLike({}, { input: input }, { userId: '1' }, {} as GraphQLResolveInfo)).rejects.toThrow('Постон дээр зүрх дарахад алдаа гарлаа');
    expect(mockCheckPostLikeExists).toHaveBeenCalledTimes(1);
    expect(mockValidateUserOwnerAndPost).toHaveBeenCalledTimes(1);
    expect(mockMakePostLike).toHaveBeenCalledTimes(1);
  });
  it('Should catch updatePostLike error', async () => {
    if (!createPostLike) {
      return;
    }
    const mockCheckPostLikeExists = jest.fn(() => null);
    const mockValidateUserOwnerAndPost = jest.fn(() => null);
    const mockMakePostLike = jest.fn(() => null);
    const mockUpdatePostLike = jest.fn(() => {
      throw new Error('Server error');
    });
    (checkPostLikeExists as jest.Mock) = mockCheckPostLikeExists;
    (validateUserOwnerAndPost as jest.Mock) = mockValidateUserOwnerAndPost;
    (makePostLike as jest.Mock) = mockMakePostLike;
    const input = { postId: '2', ownerUserId: '3' };
    (updatePostLike as jest.Mock) = mockUpdatePostLike;
    await expect(createPostLike({}, { input: input }, { userId: '1' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });
  it('SHould catch makePostLikeNotification error', async () => {
    if (!createPostLike) {
      return;
    }
    const mockCheckPostLikeExists = jest.fn(() => null);
    const mockValidateUserOwnerAndPost = jest.fn(() => null);
    const mockMakePostLike = jest.fn(() => null);
    const mockUpdatePostLike = jest.fn(() => ({
      _id: '1',
      userId: '2',
      postId: '3',
    }));
    const mockMakePostLikeNotification = jest.fn(() => {
      throw new Error('Server error');
    });
    (checkPostLikeExists as jest.Mock) = mockCheckPostLikeExists;
    (validateUserOwnerAndPost as jest.Mock) = mockValidateUserOwnerAndPost;
    (makePostLike as jest.Mock) = mockMakePostLike;
    const input = { postId: '2', ownerUserId: '3' };
    (updatePostLike as jest.Mock) = mockUpdatePostLike;
    (makePostLikeNotification as jest.Mock) = mockMakePostLikeNotification;
    await expect(createPostLike({}, { input: input }, { userId: '1' }, {} as GraphQLResolveInfo)).rejects.toThrow('Server error');
  });
  it('Should successfully make post like', async () => {
    if (!createPostLike) {
      return;
    }
    const mockCheckPostLikeExists = jest.fn(() => null);
    const mockValidateUserOwnerAndPost = jest.fn(() => null);
    const mockMakePostLike = jest.fn(() => ({
      _id: '1',
      userId: '2',
      postId: '2',
    }));
    const mockUpdatePostLike = jest.fn(() => null);
    const mockMakePostLikeNotification = jest.fn(() => '123456789');
    (checkPostLikeExists as jest.Mock) = mockCheckPostLikeExists;
    (validateUserOwnerAndPost as jest.Mock) = mockValidateUserOwnerAndPost;
    (makePostLike as jest.Mock) = mockMakePostLike;
    (updatePostLike as jest.Mock) = mockUpdatePostLike;
    (makePostLikeNotification as jest.Mock) = mockMakePostLikeNotification;
    const input = { postId: '2', ownerUserId: '3' };
    const result = await createPostLike({}, { input: input }, { userId: '1' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      userId: '2',
      postId: '2',
      notificationId: '123456789',
    });
  });
});
