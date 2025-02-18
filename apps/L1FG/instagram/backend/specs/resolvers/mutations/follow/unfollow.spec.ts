import { User } from 'apps/L1FG/instagram/backend/src/generated';
import { FollowerModel, NotificationModel, RequestModel, UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { unfollow } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

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
  followingCount: 2,
  followerCount: 1,
  postCount: 1,
};
describe('unfollow', () => {
  it('delete follow', async () => {
    (FollowerModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);
    (RequestModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);
    (NotificationModel.deleteMany as jest.Mock).mockResolvedValue(null);
    (FollowerModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(followerUser);
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedFollowerUser);

    if (!unfollow) return;

    const result = await unfollow({}, { followerId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);

    expect(result).toEqual(null);
  });
});
