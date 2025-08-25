import { User } from '../../../models/user.model';
import mongoose from 'mongoose';

interface UnfollowUserArgs {
  followerId: string;
  followingId: string;
}

interface FollowResponse {
  success: boolean;
  message: string;
  user: any;
}

// eslint-disable-next-line complexity
export const unfollowUser = async (_: unknown, args: UnfollowUserArgs): Promise<FollowResponse> => {
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

    // Check if currently following
    const isCurrentlyFollowing = follower.following?.some(
      (id: mongoose.Types.ObjectId) => id.toString() === followingId
    );

    if (!isCurrentlyFollowing) {
      return {
        success: false,
        message: 'Not currently following this user',
        user: following
      };
    }

    // Remove from following list
    await User.findByIdAndUpdate(
      followerId,
      { $pull: { following: followingId } },
      { new: true }
    );

    // Remove from followers list
    await User.findByIdAndUpdate(
      followingId,
      { $pull: { followers: followerId } },
      { new: true }
    );

    // Get updated user data
    const updatedUser = await User.findById(followingId);

    return {
      success: true,
      message: 'Successfully unfollowed user',
      user: updatedUser
    };
  } catch (error) {
    console.error('Unfollow user error:', error);
    return {
      success: false,
      message: 'Failed to unfollow user',
      user: null
    };
  }
}; 