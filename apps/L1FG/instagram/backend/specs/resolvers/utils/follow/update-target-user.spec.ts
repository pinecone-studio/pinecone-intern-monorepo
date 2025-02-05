import { Follow, Gender, User } from 'apps/L1FG/instagram/backend/src/generated';
import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { updateFollowTargetUser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/update-target-user';
jest.mock('apps/L1FG/instagram/backend/src/models');

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
const newFollow: Follow = {
  _id: '12',
  followerId: '134',
  targetId: '1134',
};
describe('Update target user', () => {
  it('Should throw failed to follow case1', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValue(null);
    (UserModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    await expect(updateFollowTargetUser(newFollow, targetUser, '456')).rejects.toThrow('Failed to follow');
    expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(3);
  });
  it('Should throw failed to follow case2', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValue(targetUser);
    (UserModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    await expect(updateFollowTargetUser(newFollow, targetUser, '456')).rejects.toThrow('Failed to follow');
    expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(3);
  });
  it('Shoudl throw failed to follow case3', async () => {
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValueOnce(targetUser).mockResolvedValueOnce(null).mockResolvedValueOnce(targetUser).mockResolvedValueOnce(updatedTargetUser);
    (UserModel.findByIdAndUpdate as jest.Mock) = mockFindByIdAndUpdate;
    await expect(updateFollowTargetUser(newFollow, targetUser, '456')).rejects.toThrow('Failed to follow');
    expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(3);
  });
});
