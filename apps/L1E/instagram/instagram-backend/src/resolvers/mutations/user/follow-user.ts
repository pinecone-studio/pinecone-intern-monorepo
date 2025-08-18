import { User } from '../../../models/user.model';
import mongoose from 'mongoose';

interface FollowUserArgs {
  followerId: string;
  followingId: string;
}

interface FollowResponse {
  success: boolean;
  message: string;
  user: any;
}

// eslint-disable-next-line complexity
export const followUser = async (_: unknown, args: FollowUserArgs): Promise<FollowResponse> => {
  const { followerId, followingId } = args;

  try {
    // Validate that both users exist
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      return {
        success: false,
        message: 'User not found',
        user: null
      };
    }

    // Check if already following
    const isAlreadyFollowing = follower.following?.some(
      (id: mongoose.Types.ObjectId) => id.toString() === followingId
    );

    if (isAlreadyFollowing) {
      return {
        success: false,
        message: 'Already following this user',
        user: following
      };
    }

    // Add to following list
    await User.findByIdAndUpdate(
      followerId,
      { $addToSet: { following: followingId } },
      { new: true }
    );

    // Add to followers list
    await User.findByIdAndUpdate(
      followingId,
      { $addToSet: { followers: followerId } },
      { new: true }
    );

    // Get updated user data
    const updatedUser = await User.findById(followingId);

    return {
      success: true,
      message: 'Successfully followed user',
      user: updatedUser
    };
  } catch (error) {
    console.error('Follow user error:', error);
    return {
      success: false,
      message: 'Failed to follow user',
      user: null
    };
  }
}; 