import { Follow, Gender, User } from 'apps/L1FG/instagram/backend/src/generated';
import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { updateFollowFollowerUser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/update-follower-user';

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
const newFollow: Follow = {
  _id: '12',
  followerId: '134',
  targetId: '1134',
};
jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Update follower user', () => {
  it('Should throw failed to follow case1', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValue(null);
    (UserModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    await expect(updateFollowFollowerUser(newFollow, followerUser, '1')).rejects.toThrow('Failed to follow');
    expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(3);
  });
  it('Should throw failed to follow case2', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValue(followerUser);
    (UserModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    await expect(updateFollowFollowerUser(newFollow, followerUser, '456')).rejects.toThrow('Failed to follow');
    expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(3);
  });
  it('Should throw failed to follow case3', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce(followerUser).mockResolvedValueOnce(null).mockResolvedValueOnce(followerUser).mockResolvedValueOnce(updatedFollowerUser);
    (UserModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    await expect(updateFollowFollowerUser(newFollow, followerUser, '456')).rejects.toThrow('Failed to follow');
    expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(3);
  });
});
