import { Gender } from 'apps/L1FG/instagram/backend/src/generated';
import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { validateFollowUsers } from 'apps/L1FG/instagram/backend/src/resolvers/mutations/follow/create-follower-utils/validate-follow-users';
jest.mock('apps/L1FG/instagram/backend/src/models');
const followerUser = {
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
const targetUser = {
  _id: '14',
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
describe('Validate follow users', () => {
  it('Follower user not found error', async () => {
    const mockFindById = jest.fn().mockResolvedValueOnce(null);
    (UserModel.findById as jest.Mock) = mockFindById;
    await expect(validateFollowUsers('123', '456')).rejects.toThrow('Follower user not found');
    expect(mockFindById).toHaveBeenCalledWith('123');
  });
  it('Target user not found', async () => {
    const mockFindById = jest.fn().mockResolvedValueOnce(followerUser).mockResolvedValueOnce(null);
    (UserModel.findById as jest.Mock) = mockFindById;
    await expect(validateFollowUsers('123', '456')).rejects.toThrow('Target user not found');
    expect(mockFindById).toHaveBeenCalledTimes(2);
    expect(mockFindById).toHaveBeenLastCalledWith('456');
  });
  it('Should return users', async () => {
    const mockFindById = jest.fn().mockResolvedValueOnce(followerUser).mockResolvedValueOnce(targetUser);
    (UserModel.findById as jest.Mock) = mockFindById;
    const result = await validateFollowUsers('123', '456');
    expect(result).toEqual({
      followerUser: followerUser,
      targetUser: targetUser,
    });
    expect(mockFindById).toHaveBeenCalledTimes(2);
  });
});
