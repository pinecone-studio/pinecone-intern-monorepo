import { unfollowUser } from '../../../../src/resolvers/mutations/user/unfollow-user';
import { User } from '../../../../src/models/user.model';
import mongoose from 'mongoose';

// Mock the User model
jest.mock('../../../../src/models/user.model');
const MockedUser = User as jest.Mocked<typeof User>;

describe('unfollowUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully unfollow a user', async () => {
    const followerId = '507f1f77bcf86cd799439011';
    const followingId = '507f1f77bcf86cd799439012';

    const mockFollower = {
      _id: followerId,
      following: [new mongoose.Types.ObjectId(followingId)]
    };

    const mockFollowing = {
      _id: followingId,
      followers: [new mongoose.Types.ObjectId(followerId)]
    };

    MockedUser.findById
      .mockResolvedValueOnce(mockFollower)
      .mockResolvedValueOnce(mockFollowing);

    MockedUser.findByIdAndUpdate
      .mockResolvedValueOnce(mockFollower)
      .mockResolvedValueOnce(mockFollowing);

    const mockUpdatedUser = {
      _id: followingId,
      followers: [],
      following: [],
      populate: jest.fn().mockReturnThis()
    };

    MockedUser.findById
      .mockResolvedValueOnce(mockFollower)
      .mockResolvedValueOnce(mockFollowing)
      .mockResolvedValue(mockUpdatedUser);

    const result = await unfollowUser(null, { followerId, followingId });

    expect(result.success).toBe(true);
    expect(result.message).toBe('Successfully unfollowed user');
    expect(result.user).toBeDefined();
    expect(MockedUser.findByIdAndUpdate).toHaveBeenCalledTimes(2);
  });

  it('should return error when follower user not found', async () => {
    const followerId = '507f1f77bcf86cd799439011';
    const followingId = '507f1f77bcf86cd799439012';

    MockedUser.findById.mockResolvedValue(null);

    const result = await unfollowUser(null, { followerId, followingId });

    expect(result.success).toBe(false);
    expect(result.message).toBe('User not found');
    expect(result.user).toBeNull();
  });

  it('should return error when following user not found', async () => {
    const followerId = '507f1f77bcf86cd799439011';
    const followingId = '507f1f77bcf86cd799439012';

    const mockFollower = {
      _id: followerId,
      following: []
    };

    MockedUser.findById
      .mockResolvedValueOnce(mockFollower)
      .mockResolvedValueOnce(null);

    const result = await unfollowUser(null, { followerId, followingId });

    expect(result.success).toBe(false);
    expect(result.message).toBe('User not found');
    expect(result.user).toBeNull();
  });

  it('should return error when not currently following', async () => {
    const followerId = '507f1f77bcf86cd799439011';
    const followingId = '507f1f77bcf86cd799439012';

    const mockFollower = {
      _id: followerId,
      following: []
    };

    const mockFollowing = {
      _id: followingId,
      followers: []
    };

    MockedUser.findById
      .mockResolvedValueOnce(mockFollower)
      .mockResolvedValueOnce(mockFollowing);

    const result = await unfollowUser(null, { followerId, followingId });

    expect(result.success).toBe(false);
    expect(result.message).toBe('Not currently following this user');
    expect(result.user).toBeDefined();
  });

  it('should handle database errors gracefully', async () => {
    const followerId = '507f1f77bcf86cd799439011';
    const followingId = '507f1f77bcf86cd799439012';

    MockedUser.findById.mockRejectedValue(new Error('Database error'));

    const result = await unfollowUser(null, { followerId, followingId });

    expect(result.success).toBe(false);
    expect(result.message).toBe('Failed to unfollow user');
    expect(result.user).toBeNull();
  });
}); 