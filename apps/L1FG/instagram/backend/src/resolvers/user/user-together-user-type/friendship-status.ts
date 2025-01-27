import { UserTogetherUserTypeResolvers } from '../../../generated';
import { FollowerModel,RequestModel } from '../../../models';
import { statusBooleanConverter,StatusType } from '../../follow/follower-user-type/status-boolean-converter';

export const friendshipStatus: UserTogetherUserTypeResolvers['friendshipStatus'] = async ({ _id }, _, { userId }) => {
  if (userId == _id) {
    return {
      followedBy: false,
      following: false,
      incomingRequest: false,
      outgoingRequest: false,
    };
  }
  const followingPromise = FollowerModel.findOne({ followerId: userId, targetId: _id });

  const incomingRequestPromise = RequestModel.findOne({ to: userId, from: _id });

  const followedByPromise = FollowerModel.findOne({ followerId: _id, targetId: userId });

  const outgoingRequestPromise = RequestModel.findOne({ from: userId, to: _id });
  const [fIng, i, o, fBy]: StatusType[] = await Promise.all([followingPromise, incomingRequestPromise, outgoingRequestPromise, followedByPromise]);
  return statusBooleanConverter({ arg: [fIng, i, o, fBy] });
};
