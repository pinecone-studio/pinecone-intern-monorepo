import { QueryResolvers } from '../../../generated';
import { FollowerModel } from '../../../models';

export const getFollowers: QueryResolvers['getFollowers'] = async (_, { searchingUserId }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const followers = await FollowerModel.find({ targetId: searchingUserId }).populate('followerId');
  return followers;
};
