import { FollowingUserTypeResolvers } from '../../../generated';
import { FollowerModel, RequestModel } from '../../../models';
import { statusBooleanConverter, StatusType } from '../follower-user-type/status-boolean-converter';

export const friendshipStatus: FollowingUserTypeResolvers['friendshipStatus'] = async ({ _id }, _, { userId }) => {
  const followingPromise =
    userId == _id
      ? new Promise((resolve) => {
          resolve(true);
        })
      : FollowerModel.findOne({ followerId: userId, targetId: _id });

  const incomingRequestPromise = RequestModel.findOne({ to: userId, from: _id });

  const outgoingRequestPromise =
    userId == _id
      ? new Promise((resolve) => {
          resolve(null);
        })
      : RequestModel.findOne({ from: userId, to: _id });

  const followedByPromise = FollowerModel.findOne({ follwerId: _id, targetId: userId });

  const [fIng, i, o, fBy]: StatusType[] = await Promise.all([followingPromise, incomingRequestPromise, outgoingRequestPromise, followedByPromise]);
  return statusBooleanConverter({ arg: [fIng, i, o, fBy] });
};
