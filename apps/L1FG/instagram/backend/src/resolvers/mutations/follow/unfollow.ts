import { MutationResolvers } from '../../../generated';
import { FollowerModel } from '../../../models';

export const unfollow: MutationResolvers['unfollow'] = async (_, { followerId }, { userId }) => {
  const follow = await FollowerModel.findOneAndDelete({ targetId: followerId, followerId: userId });

  return follow;
};
