import { QueryResolvers } from '../../../generated';
import { FollowerModel } from '../../../models';

export const getFollowing: QueryResolvers['getFollowing'] = async (_, { searchingUserId }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const following = await FollowerModel.find({ followerId: searchingUserId });
  return following;
};
