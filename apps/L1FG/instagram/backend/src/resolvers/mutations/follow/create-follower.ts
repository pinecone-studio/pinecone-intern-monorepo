/*eslint-disable*/

import { GraphQLError } from 'graphql';
import { Follow, MutationResolvers, User } from '../../../generated';
import { FollowerModel, RequestModel, UserModel } from '../../../models';
import { CreationError, UserFoundError, UserNotFoundError } from '../../../utils/error';

export const createFollower: MutationResolvers['createFollower'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { targetId } = input;
  try {
    const foundFollow = await FollowerModel.findOne({
      followerId: userId,
      targetId: targetId,
    });
    if (foundFollow) {
      throw new UserFoundError('Already followed');
    }
    const followerUser: User | null = await UserModel.findById(userId);
    if (!followerUser) {
      throw new UserNotFoundError('Follower user not found');
    }
    const targetUser: User | null = await UserModel.findById(targetId);
    if (!targetUser) {
      throw new UserNotFoundError('Target user not found');
    }
    if (targetUser.isPrivate) {
      const newRequest = await RequestModel.create({
        from: userId,
        to: targetId,
      });
      if (!newRequest) {
        {
          throw new CreationError('Failed to request');
        }
      }
      return {
        isFollowed: false,
        isRequested: true,
      };
    }
    const follow: Follow | null = await FollowerModel.create({
      followerId: userId,
      targetId,
    });
    if (!follow) {
      throw new CreationError('Failed to follow');
    }
    let updatedTargetUser: User | null = await UserModel.findByIdAndUpdate(targetId, { $inc: { followerCount: 1 } }, { new: true });
    let updateTargetTry = 0;
    while (!updatedTargetUser || targetUser.followerCount >= updatedTargetUser.followerCount) {
      if (updateTargetTry > 1) {
        break;
      }
      updatedTargetUser = await UserModel.findByIdAndUpdate(targetId, { $inc: { followerCount: 1 } }, { new: true });
      updateTargetTry++;
    }
    if (!updatedTargetUser || targetUser.followerCount >= updatedTargetUser.followerCount) {
      await FollowerModel.findByIdAndDelete(follow._id);
      throw new CreationError('Failed to follow');
    }

    let updatedFollowerUser = await UserModel.findByIdAndUpdate(userId, { $inc: { followingCount: 1 } }, { new: true });
    let updateFollowerTry = 0;
    while (!updateTargetTry || followerUser.followingCount >= updatedFollowerUser.followingCount) {
      if (updateFollowerTry > 1) {
        break;
      }
      updatedFollowerUser = await UserModel.findByIdAndUpdate(userId, { $inc: { followingCount: 1 } }, { new: true });
      updateFollowerTry++;
    }
    if (!updatedFollowerUser || followerUser.followingCount >= updatedFollowerUser.followingCount) {
      await FollowerModel.findByIdAndDelete(follow._id);
      throw new CreationError('Failed to follow');
    }

    return {
      isFollowed: true,
      isRequested: false,
    };
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      throw new GraphQLError(`${error.message}`, {
        extensions: {
          code: `${error.name}`,
        },
      });
    }
    if (error instanceof CreationError) {
      throw new GraphQLError(`${error.message}`, {
        extensions: {
          code: `${error.name}`,
        },
      });
    }
    if (error instanceof UserFoundError) {
      throw new GraphQLError(`${error.message}`, {
        extensions: {
          code: `${error.name}`,
        },
      });
    }
    throw new GraphQLError('Database error');
  }
};
