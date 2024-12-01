import { QueryResolvers } from '../../../generated';
import { followersModel } from '../../../models';

export const getFollowersById: QueryResolvers['getFollowersById'] = async (_, { _id }) => {
  const followers = await followersModel.find({ followeeId: _id }).populate('followerId');

  if (!followers.length) {
    throw new Error('Followers not found');
  }

  return followers.map((follow) => follow.followerId);
};
