import { MutationResolvers } from '../../../generated';
import { followersModel } from '../../../models';

export const deleteFollower: MutationResolvers['deleteFollower'] = async (_, { followerId, followeeId }) => {
  const result = await followersModel.findOneAndDelete({
    followeeId: followeeId,
    followerId: followerId,
  });
  if (!result) {
    throw new Error('Follower relationship not found');
  }

  return result;
};
