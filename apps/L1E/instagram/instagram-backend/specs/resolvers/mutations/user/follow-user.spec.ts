import { followUser } from '../../../../src/resolvers/mutations/user/follow-user';
import { User } from '../../../../src/models/user.model';
import mongoose from 'mongoose';

// Mock the User model
jest.mock('../../../../src/models/user.model');
const MockedUser = User as jest.Mocked<typeof User>;

describe('followUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully follow a user', async () => {
    const followerId = '507f1f77bcf86cd799439011';
    const followingId = '507f1f77bcf86cd799439012';

    const mockFollower = {
      _id: followerId,
      following: [],
      save: jest.fn()
    };

    const mockFollowing = {
      _id: followingId,
      followers: [],
      save: jest.fn()
    };

    MockedUser.findById
      .mockResolvedValueOnce(mockFollower)
      .mockResolvedValueOnce(mockFollowing);

    MockedUser.findByIdAndUpdate
      .mockResolvedValueOnce(mockFollower)
      .mockResolvedValueOnce(mockFollowing);

    const mockUpdatedUser = {
      _id: followingId,
      followers: [followerId],
      following: [],
      populate: jest.fn().mockReturnThis()
    };

    MockedUser.findById
    .mockResolvedValueOnce(mockFollower)
    .mockResolvedValueOnce(mockFollowing)
    .mockResolvedValue(mockUpdatedUser);

    const result = await followUser(null, { followerId, followingId });

    expect(result.success).toBe(true);
    expect(result.message).toBe('Successfully followed user');
    expect(result.user).toBeDefined();
    expect(MockedUser.findByIdAndUpdate).toHaveBeenCalledTimes(2);
  });

  it('should return error when follower user not found', async () => {
    const followerId = '507f1f77bcf86cd799439011';
    const followingId = '507f1f77bcf86cd799439012';

    MockedUser.findById.mockResolvedValue(null);

    const result = await followUser(null, { followerId, followingId });

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

    const result = await followUser(null, { followerId, followingId });

    expect(result.success).toBe(false);
    expect(result.message).toBe('User not found');
    expect(result.user).toBeNull();
  });

  it('should return error when already following', async () => {
    const followerId = '507f1f77bcf86cd799439011';
    const followingId = '507f1f77bcf86cd799439012';

    const mockFollower = {
      _id: followerId,
      following: [new mongoose.Types.ObjectId(followingId)]
    };

    const mockFollowing = {
      _id: followingId,
      followers: []
    };

    MockedUser.findById
      .mockResolvedValueOnce(mockFollower)
      .mockResolvedValueOnce(mockFollowing);

    const result = await followUser(null, { followerId, followingId });

    expect(result.success).toBe(false);
    expect(result.message).toBe('Already following this user');
    expect(result.user).toBeDefined();
  });

  it('should handle database errors gracefully', async () => {
    const followerId = '507f1f77bcf86cd799439011';
    const followingId = '507f1f77bcf86cd799439012';

    MockedUser.findById.mockRejectedValue(new Error('Database error'));

    const result = await followUser(null, { followerId, followingId });

    expect(result.success).toBe(false);
    expect(result.message).toBe('Failed to follow user');
    expect(result.user).toBeNull();
  });
}); 