jest.mock('apps/L1FG/instagram/backend/src/models');
import { StoryModel } from 'apps/L1FG/instagram/backend/src/models';
import { latestStoryTimestamp } from 'apps/L1FG/instagram/backend/src/resolvers/user/user-together-user-type';
import { GraphQLResolveInfo } from 'graphql';
describe('Latest story timestamp', () => {
  it('Should get story', async () => {
    if (!latestStoryTimestamp) {
      return;
    }
    (StoryModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue([
        {
          _id: '3',
          bio: '',
          email: '',
          fullName: '',
          userName: '',
          followingCount: 0,
          followerCount: 0,
          postCount: 0,
          latestStoryTimestamp: 0,
          createdAt: '2',
          proifleImage: 'image',
          expiringAt: 1234,
          friendshipStatus: {
            following: false,
            incomingRequest: false,
            outgoingRequest: false,
            followedBy: false,
          },
        },
      ]),
    });
    const parent = {
      _id: '3',
      bio: '',
      email: '',
      fullName: '',
      userName: '',
      followingCount: 0,
      followerCount: 0,
      postCount: 0,
      latestStoryTimestamp: 0,
      profileImage: 'image',
      friendshipStatus: {
        following: false,
        incomingRequest: false,
        outgoingRequest: false,
        followedBy: false,
      },
    };
    const result = await latestStoryTimestamp(parent, {}, { userId: '3' }, {} as GraphQLResolveInfo);
    expect(result).toEqual(1234);
  });
  it('Should return 0', async () => {
    if (!latestStoryTimestamp) {
      return;
    }
    (StoryModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue([]),
    });
    const parent = {
      _id: '3',
      bio: '',
      email: '',
      fullName: '',
      userName: '',
      followingCount: 0,
      followerCount: 0,
      postCount: 0,
      latestStoryTimestamp: 0,
      profileImage: 'image',
      expiringAt: 1234,
      friendshipStatus: {
        following: false,
        incomingRequest: false,
        outgoingRequest: false,
        followedBy: false,
      },
    };
    const result = await latestStoryTimestamp(parent, {}, { userId: '3' }, {} as GraphQLResolveInfo);
    expect(result).toBe(0);
  });
});
