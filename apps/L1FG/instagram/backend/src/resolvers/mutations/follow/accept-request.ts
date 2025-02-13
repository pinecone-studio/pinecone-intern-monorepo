import { MutationResolvers } from '../../../generated';
import { FollowerModel, RequestModel } from '../../../models';
import { authenticate } from '../../../utils/authenticate';
import { updateFollowFollowerUser } from './create-follower-utils/update-follower-user';
import { updateFollowTargetUser } from './create-follower-utils/update-target-user';
import { validateFollowUsers } from './create-follower-utils/validate-follow-users';
import { validateFoundFollow } from './create-follower-utils/validate-found-follow';

export const acceptRequest: MutationResolvers['acceptRequest'] = async (_, { followerId }, { userId }) => {
  authenticate(userId);
  await validateFoundFollow(followerId, userId as string);
  const users = await validateFollowUsers(followerId, userId as string);
  const follow = await FollowerModel.create({
    targetId: userId,
    followerId,
  });
  await RequestModel.findOneAndDelete({ from: followerId, to: userId });
  await updateFollowTargetUser(follow, users.targetUser, userId as string);
  await updateFollowFollowerUser(follow, users.followerUser, followerId);
  return {
    isFollowed: true,
    isRequested: false,
  };
};
