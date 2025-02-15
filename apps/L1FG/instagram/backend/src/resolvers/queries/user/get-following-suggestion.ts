import mongoose from 'mongoose';
import { QueryResolvers } from '../../../generated';
import { FollowerModel, RequestModel, UserModel } from '../../../models';

export const getFollowingSuggestion: QueryResolvers['getFollowingSuggestion'] = async (_, __, { userId }) => {
  if (!userId) {
    throw new Error('Та нэвтэрнэ үү!');
  }
  const followingPeople = await FollowerModel.find({ followerId: userId });
  const requestedPeople = await RequestModel.find({ from: userId });
  const followingIds = followingPeople.map((entry) => entry.targetId);
  const requestedIds = requestedPeople.map((requested) => requested.to);
  const suggestedUsers = await UserModel.find({
    _id: { $nin: [...followingIds, ...requestedIds, new mongoose.Types.ObjectId(userId)] },
  }).limit(6);

  return suggestedUsers;
};
