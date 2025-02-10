import { QueryResolvers } from '../../../generated';
import { FollowerModel, UserModel } from '../../../models';

export const getFollowingSuggestion: QueryResolvers['getFollowingSuggestion'] = async (_, __, { userId }) => {
  if (!userId) {
    throw new Error('Та нэвтэрнэ үү!');
  }
  const following = await FollowerModel.find({ followerId: userId }).select('targetID');
  const followingIds = following.map((entry) => entry._id.toString());
  const suggestedUsers = await UserModel.find({
    _id: { $nin: [...followingIds, userId] },
  }).limit(6);

  return suggestedUsers;
};
