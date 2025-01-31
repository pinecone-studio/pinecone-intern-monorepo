/*eslint-disable*/
import { MutationResolvers } from '../../../generated';
import { authenticate } from '../../../utils/authenticate';
import { makeFollow } from './create-follower-utils/make-follow';
import { sendRequestIfPrivate } from './create-follower-utils/send-request-if-private';
import { updateFollowFollowerUser } from './create-follower-utils/update-follower-user';
import { updateFollowTargetUser } from './create-follower-utils/update-target-user';
import { validateFollowUsers } from './create-follower-utils/validate-follow-users';
import { validateFoundFollow } from './create-follower-utils/validate-found-follow';

export const createFollower: MutationResolvers['createFollower'] = async (_, { input }, { userId }) => {
  const { targetId } = input;
  authenticate(userId);
  await validateFoundFollow(userId, targetId);
  const users = await validateFollowUsers(userId, targetId);
  const result = await sendRequestIfPrivate(users.targetUser, userId, targetId);
  if (result) {
    return result;
  }
  const newFollow = await makeFollow(userId, targetId);
  await updateFollowTargetUser(newFollow, users.targetUser, targetId);
  await updateFollowFollowerUser(newFollow, users.followerUser, userId);
  return {
    isFollowed: true,
    isRequested: false,
  };
};
