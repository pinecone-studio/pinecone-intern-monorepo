import { MutationResolvers } from '../../../generated';
import { FollowerModel } from '../../../models';

export const createFollower: MutationResolvers['createFollower'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { followerId, targetId } = input;
  const follow = await FollowerModel.create({
    followerId,
    targetId,
  });
  return follow;
};
