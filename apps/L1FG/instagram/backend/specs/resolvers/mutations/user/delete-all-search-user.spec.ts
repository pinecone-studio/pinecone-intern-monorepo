import { UserModel } from '../../../../src/models';
import { deleteAllSearchUser } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models');

describe('delete users', () => {
  it('delete', async () => {
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: '14',
      userName: 'mike',
      fullName: 'mike mack',
      email: 'mike@gmail.com',
      bio: 'builder',
      password: '1235',
      isPrivate: false,
      hasStory: false,
      profileImage: 'https:/image.com',
      followingCount: 2,
      followerCount: 2,
      postCount: 2,
    });

    if (!deleteAllSearchUser) return;

    const result = await deleteAllSearchUser({}, {}, { userId: '1' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '14',
      userName: 'mike',
      fullName: 'mike mack',
      email: 'mike@gmail.com',
      bio: 'builder',
      password: '1235',
      isPrivate: false,
      hasStory: false,
      profileImage: 'https:/image.com',
      followingCount: 2,
      followerCount: 2,
      postCount: 2,
    });
  });
});
