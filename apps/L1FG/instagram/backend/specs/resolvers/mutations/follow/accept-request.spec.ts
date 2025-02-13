/*eslint-disable*/
import { Gender, User } from 'apps/L1FG/instagram/backend/src/generated';
import { FollowerModel, RequestModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { acceptRequest } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { makeFollow } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/make-follow';
import { sendRequestIfPrivate } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/send-request-if-private';
import { updateFollowFollowerUser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/update-follower-user';
import { updateFollowTargetUser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/update-target-user';
import { validateFollowUsers } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/validate-follow-users';
import { authenticate } from 'apps/L1FG/instagram/backend/src/utils/authenticate';
import { GraphQLResolveInfo } from 'graphql';
const followerUser: User = {
  _id: '13',
  userName: 'john',
  fullName: 'john mack',
  email: 'john@gmail.com',
  bio: 'nurse',
  password: '123',
  isPrivate: false,
  hasStory: false,
  profileImage: 'https:/image.com',
  gender: Gender.Male,
  followingCount: 1,
  followerCount: 1,
  postCount: 1,
};
const targetUser: User = {
  _id: '14',
  userName: 'mike',
  fullName: 'mike mack',
  email: 'mike@gmail.com',
  bio: 'builder',
  password: '1235',
  isPrivate: false,
  hasStory: false,
  profileImage: 'https:/image.com',
  gender: Gender.Male,
  followingCount: 2,
  followerCount: 2,
  postCount: 2,
};
const updatedTargetUser: User = {
  _id: '14',
  userName: 'mike',
  fullName: 'mike mack',
  email: 'mike@gmail.com',
  bio: 'builder',
  password: '1235',
  isPrivate: false,
  hasStory: false,
  profileImage: 'https:/image.com',
  gender: Gender.Male,
  followingCount: 2,
  followerCount: 3,
  postCount: 2,
};
jest.mock('apps/L1FG/instagram/backend/src/models');
jest.mock('apps/L1FG/instagram/backend/src/utils/authenticate');

describe('Follow', () => {
  it('Should throw an authentication error', async () => {
    if (!acceptRequest) {
      return;
    }
    const mockAuthenticate = jest.fn(() => {
      throw new Error('Та нэвтэрнэ үү');
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    await expect(acceptRequest({}, { followerId: '1' }, { userId: 'hi' }, {} as GraphQLResolveInfo)).rejects.toThrow('Та нэвтэрнэ үү');
  });
  it('Should throw follower user not found error', async () => {
    if (!acceptRequest) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockValidateFollowUsers = jest.fn(() => {
      throw new Error('Follower user not found');
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    (validateFollowUsers as jest.Mock) = mockValidateFollowUsers;
    await expect(acceptRequest({}, { followerId: '1' }, { userId: 'hi' }, {} as GraphQLResolveInfo)).rejects.toThrow('Follower user not found');
  });
  it('SHould throw target user not found error', async () => {
    if (!acceptRequest) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockValidateFollowUsers = jest.fn(() => {
      throw new Error('Target user not found');
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    (validateFollowUsers as jest.Mock) = mockValidateFollowUsers;
    await expect(acceptRequest({}, { followerId: '1' }, { userId: 'hi' }, {} as GraphQLResolveInfo)).rejects.toThrow('Target user not found');
    expect(mockAuthenticate);
  });

  it('Should throw that failed to follow when making a follow', async () => {
    if (!acceptRequest) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockValidateFollowUsers = jest.fn().mockResolvedValueOnce({ followerUser: followerUser, targetUser: targetUser });
    const mockSendRequestIfPrivate = jest.fn().mockResolvedValueOnce(null);
    const mockMakeFollow = jest.fn(() => {
      throw new Error('Failed to follow');
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    (validateFollowUsers as jest.Mock) = mockValidateFollowUsers;
    (sendRequestIfPrivate as jest.Mock) = mockSendRequestIfPrivate;
    (FollowerModel.create as jest.Mock) = mockMakeFollow;
    await expect(acceptRequest({}, { followerId: '1' }, { userId: 'hi' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to follow');
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockValidateFollowUsers).toHaveBeenCalledTimes(1);
    expect(mockMakeFollow).toHaveBeenCalledTimes(1);
  });
  it('Should throw that failed to follow when update target user', async () => {
    if (!acceptRequest) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockValidateFollowUsers = jest.fn().mockResolvedValueOnce({ followerUser: followerUser, targetUser: targetUser });
    const mockMakeFollow = jest.fn().mockResolvedValueOnce(null);
    const mockUpdateFollowTargetUser = jest.fn(() => {
      throw new Error('Failed to follow');
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    (validateFollowUsers as jest.Mock) = mockValidateFollowUsers;
    (FollowerModel.create as jest.Mock) = mockMakeFollow;
    (updateFollowTargetUser as jest.Mock) = mockUpdateFollowTargetUser;
    await expect(acceptRequest({}, { followerId: '1' }, { userId: 'hi' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to follow');
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockValidateFollowUsers).toHaveBeenCalledTimes(1);
    expect(mockMakeFollow).toHaveBeenCalledTimes(1);
  });
  it('Should throw that failed to follow when update follower user', async () => {
    if (!acceptRequest) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockValidateFollowUsers = jest.fn().mockResolvedValueOnce({ followerUser: followerUser, targetUser: targetUser });
    const mockMakeFollow = jest.fn().mockResolvedValueOnce(null);
    const mockUpdateFollowTargetUser = jest.fn().mockResolvedValueOnce(updatedTargetUser);
    const mockUpdateFollowFollowerUser = jest.fn(() => {
      throw new Error('Failed to follow');
    });
    (authenticate as jest.Mock) = mockAuthenticate;
    (validateFollowUsers as jest.Mock) = mockValidateFollowUsers;
    (FollowerModel.create as jest.Mock) = mockMakeFollow;
    (updateFollowTargetUser as jest.Mock) = mockUpdateFollowTargetUser;
    (updateFollowFollowerUser as jest.Mock) = mockUpdateFollowFollowerUser;
    await expect(acceptRequest({}, { followerId: '1' }, { userId: 'hi' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to follow');
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockValidateFollowUsers).toHaveBeenCalledTimes(1);
    expect(mockMakeFollow).toHaveBeenCalledTimes(1);
  });
  it('Should throw that failed to follow when update follower user', async () => {
    if (!acceptRequest) {
      return;
    }
    const mockAuthenticate = jest.fn().mockResolvedValueOnce(null);
    const mockValidateFollowUsers = jest.fn().mockResolvedValueOnce({ followerUser: followerUser, targetUser: targetUser });
    const mockMakeFollow = jest.fn().mockResolvedValueOnce(null);
    const mockUpdateFollowTargetUser = jest.fn().mockResolvedValueOnce(updatedTargetUser);
    const mockUpdateFollowFollowerUser = jest.fn().mockResolvedValueOnce(null);
    (authenticate as jest.Mock) = mockAuthenticate;
    (validateFollowUsers as jest.Mock) = mockValidateFollowUsers;
    (FollowerModel.create as jest.Mock) = mockMakeFollow;
    (updateFollowTargetUser as jest.Mock) = mockUpdateFollowTargetUser;
    (updateFollowFollowerUser as jest.Mock) = mockUpdateFollowFollowerUser;
    const result = await acceptRequest({}, { followerId: '1' }, { userId: 'hi' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      isFollowed: true,
      isRequested: false,
    });
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockValidateFollowUsers).toHaveBeenCalledTimes(1);
    expect(mockMakeFollow).toHaveBeenCalledTimes(1);
    expect(mockUpdateFollowFollowerUser).toHaveBeenCalledTimes(1);
  });
});
