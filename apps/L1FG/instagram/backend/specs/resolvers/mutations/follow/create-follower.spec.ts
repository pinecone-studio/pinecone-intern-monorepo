/*eslint-disable*/
import { Gender, User } from 'apps/L1FG/instagram/backend/src/generated';
import { FollowerModel, RequestModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { createFollower } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
const input = {
  targetId: '14',
};
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
const updatedFollowerUser: User = {
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
  followingCount: 2,
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
const privateTargetUser: User = {
  _id: '14',
  userName: 'mike',
  fullName: 'mike mack',
  email: 'mike@gmail.com',
  bio: 'builder',
  password: '1235',
  isPrivate: true,
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
const Followed = {
  isFollowed: true,
  isRequested: false,
};
const Requested = {
  isFollowed: false,
  isRequested: true,
};
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Follow', () => {
  it('Should throw follow exist error ', async () => {
    if (!createFollower) {
      return;
    }
    (FollowerModel.findOne as jest.Mock).mockResolvedValue({
      _id: '1432',
      followerId: '13',
      targetId: '14',
    });
    await expect(createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Already followed');
  });
  it('Should make a request', async () => {
    if (!createFollower) {
      return;
    }
    (UserModel.findById as jest.Mock).mockResolvedValueOnce(followerUser).mockResolvedValueOnce(privateTargetUser);
    (FollowerModel.findOne as jest.Mock).mockResolvedValue(null);
    (RequestModel.create as jest.Mock).mockResolvedValue(Requested);
    const result = await createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo);
    expect(result).toEqual(Requested);
  });
  it('Should throw request creation fail', async () => {
    if (!createFollower) {
      return;
    }
    (UserModel.findById as jest.Mock).mockResolvedValueOnce(followerUser).mockResolvedValueOnce(privateTargetUser);
    (FollowerModel.findOne as jest.Mock).mockResolvedValue(null);
    (RequestModel.create as jest.Mock).mockResolvedValue(null);
    await expect(createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to request');
  });
  it('Should throw follower user not found error', async () => {
    if (!createFollower) {
      return;
    }
    (FollowerModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.findById as jest.Mock).mockResolvedValue(null);
    await expect(createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Follower user not found');
  });
  it('Should throw target user not found error', async () => {
    if (!createFollower) {
      return;
    }
    (FollowerModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.findById as jest.Mock).mockResolvedValueOnce(followerUser).mockResolvedValueOnce(null);
    await expect(createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Target user not found');
  });
  it('Should throw a creation error', async () => {
    if (!createFollower) {
      return;
    }
    (UserModel.findById as jest.Mock).mockResolvedValueOnce(followerUser).mockResolvedValueOnce(targetUser);
    (FollowerModel.findOne as jest.Mock).mockResolvedValue(null);
    (FollowerModel.create as jest.Mock).mockResolvedValue(null);
    await expect(createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to follow');
  });
  it('Should try 2 times to update target user follower:CASE 2(null,targetUser)', async () => {
    if (!createFollower) {
      return;
    }
    (UserModel.findById as jest.Mock).mockResolvedValueOnce(followerUser).mockResolvedValueOnce(targetUser);
    (FollowerModel.findOne as jest.Mock).mockResolvedValue(null);
    (FollowerModel.create as jest.Mock).mockResolvedValue(Followed);
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(targetUser).mockResolvedValueOnce(targetUser).mockResolvedValueOnce(null);
    (FollowerModel.findByIdAndDelete as jest.Mock).mockResolvedValue(Followed);
    await expect(createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to follow');
  });

  it('Should not try 2 times to update target user follower', async () => {
    if (!createFollower) {
      return;
    }
    (UserModel.findById as jest.Mock).mockResolvedValueOnce(followerUser).mockResolvedValueOnce(targetUser);
    (FollowerModel.create as jest.Mock).mockResolvedValue(Followed);
    (FollowerModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(targetUser).mockResolvedValueOnce(targetUser).mockResolvedValueOnce(targetUser).mockResolvedValueOnce(updatedTargetUser);
    (FollowerModel.findByIdAndDelete as jest.Mock).mockResolvedValue(Followed);
    await expect(createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to follow');
  });
  it('Should try 2 times to update follower user following:CASE1 (null,null)', async () => {
    if (!createFollower) {
      return;
    }
    (UserModel.findById as jest.Mock).mockResolvedValueOnce(followerUser).mockResolvedValueOnce(targetUser);
    (FollowerModel.create as jest.Mock).mockResolvedValue(Followed);
    (FollowerModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.findByIdAndUpdate as jest.Mock)
      .mockResolvedValueOnce(updatedTargetUser)
      .mockResolvedValueOnce(followerUser)
      .mockResolvedValueOnce(followerUser)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(updatedFollowerUser);
    (FollowerModel.findByIdAndDelete as jest.Mock).mockResolvedValue(Followed);
    await expect(createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to follow');
  });
  it('Should follow', async () => {
    if (!createFollower) {
      return;
    }
    (UserModel.findById as jest.Mock).mockResolvedValueOnce(followerUser).mockResolvedValueOnce(targetUser);
    (FollowerModel.create as jest.Mock).mockResolvedValue(Followed);
    (FollowerModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedTargetUser).mockResolvedValueOnce(updatedFollowerUser);
    const result = await createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo);
    expect(result).toEqual(Followed);
  });
  it('Should throw an unauthorized error', async () => {
    if (!createFollower) {
      return;
    }
    await expect(createFollower({}, { input }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
  it('Should throw an database error', async () => {
    if (!createFollower) {
      return;
    }
    const mockFindById = jest.fn(() => {
      throw new Error('Error');
    });
    UserModel.findById = mockFindById;
    await expect(createFollower({}, { input }, { userId: '13' }, {} as GraphQLResolveInfo)).rejects.toThrow('Database error');
  });
});
