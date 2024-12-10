import { MutationResolvers } from '../../../generated';
import { followersModel, notificationsModel } from '../../../models';

export const createFollowers: MutationResolvers['createFollowers'] = async (_: unknown, { followerId, followeeId }) => {
  const isFollowed = await followersModel.find({ followerId: followerId, followeeId: followeeId });

  if (isFollowed.length === 0) {
    await followersModel.create({
      followerId: followerId,
      followeeId: followeeId,
      createdAt: new Date(),
    });
    await notificationsModel.create({
      userId: followerId,
      type: 'follow',
      notifiedUserId: followeeId,
    });
    return { message: 'Successfully followed' };
  } else {
    await followersModel.deleteOne({ followerId: followerId, followeeId: followeeId });
    return { message: 'Successfully unfollowed' };
  }
};
