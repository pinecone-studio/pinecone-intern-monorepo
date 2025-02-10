import { GraphQLResolveInfo } from 'graphql';
import { user } from '../../../../src/resolvers/post/user-post-type';
import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('user', () => {
  it('Should give an user', async () => {
    if (!user) {
      return;
    }
    (UserModel.findById as jest.Mock).mockResolvedValue({
      userName: 'asd',
      fullName: 'afd',
    });
    const parent = {
      _id: 'hi',
      userId: 'fs',
      commentCount: 2,
      likeCount: 3,
      postImage: ['fad'],
      carouselMediaCount: 3,
      hasLiked: false,
      createdAt: 890,
      caption: '',
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
    const result = await user(parent, {}, { userId: 'er' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      userName: 'asd',
      fullName: 'afd',
    });
  });
});
