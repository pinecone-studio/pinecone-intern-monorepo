import { UserModel } from '../../../../src/models';
import { user } from '../../../../src/resolvers/follow/following-type';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models');

describe('Follower Type user', () => {
  it('Should return user', async () => {
    if (!user) {
      return;
    }
    const mockFindById = jest.fn().mockResolvedValue({
      _id: '12',
      userName: 'john',
      fullName: 'john mackvey',
      bio: 'hi',
      profileImage: 'image',
      email: 'john@gmail.com',
      followingCount: 3,
      followerCount: 3,
      postCount: 3,
    });
    (UserModel.findById as jest.Mock) = mockFindById;
    const parent = {
      _id: '1',
      followerId: '34',
      targetId: '35',
      user: {
        _id: '3',
        userName: 'john',
        fullName: 'john mackvey',
        bio: 'hi',
        profileImage: 'image',
        email: 'john@gmail.com',
        followingCount: 3,
        followerCount: 3,
        postCount: 3,
        friendshipStatus: {
          following: false,
          incomingRequest: false,
          outgoingRequest: false,
          followedBy: false,
        },
      },
    };
    const result = await user(parent, {}, { userId: '1234' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '12',
      userName: 'john',
      fullName: 'john mackvey',
      bio: 'hi',
      profileImage: 'image',
      email: 'john@gmail.com',
      followingCount: 3,
      followerCount: 3,
      postCount: 3,
    });
  });
});
