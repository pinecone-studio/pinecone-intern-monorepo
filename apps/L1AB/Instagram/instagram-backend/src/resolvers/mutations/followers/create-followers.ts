import { MutationResolvers } from '../../../generated';
import { followersModel } from '../../../models';

export const createFollowers: MutationResolvers['createFollowers'] = async (_: unknown, { followerId, followeeId }) => {
  try {
    const followers = await followersModel.create({
      followerId: followerId,
      followeeId: followeeId,
      createdAt: new Date(),
    });

    return followers;
  } catch (error) {
    throw new Error('There is no followers with this ID');
  }
};
