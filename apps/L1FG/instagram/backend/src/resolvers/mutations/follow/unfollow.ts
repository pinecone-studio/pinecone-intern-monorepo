import { MutationResolvers } from '../../../generated';
import { FollowerModel, NotificationModel, RequestModel, UserModel } from '../../../models';

export const unfollow: MutationResolvers['unfollow'] = async (_, { followerId }, { userId }) => {
  const follow = await FollowerModel.findOneAndDelete({ targetId: followerId, followerId: userId });

  await UserModel.findByIdAndUpdate({ _id: followerId }, { $inc: { followerCount: -1 } }, { new: true });
  await UserModel.findByIdAndUpdate({ _id: userId }, { $inc: { followingCount: -1 } }, { new: true });
  await FollowerModel.findOneAndDelete({ targetId: followerId, followerId: userId });
  await RequestModel.findOneAndDelete({ from: userId, to: followerId });
  await NotificationModel.findOneAndDelete({ categoryType: 'REQUEST', ownerId: followerId, userId: userId });

  return follow;
};
