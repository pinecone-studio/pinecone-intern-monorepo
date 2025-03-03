import { UserModel } from '../../../../src/models';
import { updateProfileImage } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('update profile photo', () => {
  it('equal data', async () => {
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

    if (!updateProfileImage) return;

    const result = await updateProfileImage({}, { image: 'https:/image.com' }, { userId: '1' }, {} as GraphQLResolveInfo);

    expect(result).toEqual('https:/image.com');
  });
});
