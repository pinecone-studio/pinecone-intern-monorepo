import { User } from '../../../../src/generated';
import { FollowerModel, NotificationModel, RequestModel, UserModel } from '../../../../src/models';
import { unfollow } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models');

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
    (NotificationModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);
    (FollowerModel.findOneAndDelete as jest.Mock).mockResolvedValue(null);
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(followerUser);
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedFollowerUser);

    if (!unfollow) return;

    const result = await unfollow({}, { followerId: '1' }, { userId: '2' }, {} as GraphQLResolveInfo);

    expect(result).toEqual(null);
  });
});
