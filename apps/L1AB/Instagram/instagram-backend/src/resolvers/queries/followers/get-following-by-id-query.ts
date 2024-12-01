import { QueryResolvers } from '../../../generated';
import { followersModel } from '../../../models';

export const getFollowingById: QueryResolvers['getFollowingById'] = async (_, { _id }) => {
  const followers = await followersModel.find({ followerId: _id }).populate('followeeId');

  if (!followers.length) {
    throw new Error('Following not found');
  }

  return followers.map((follow) => follow.followeeId);
};
