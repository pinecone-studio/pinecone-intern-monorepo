import { FollowerUserTypeResolvers } from '../../generated';
import { FollowerModel, RequestModel } from '../../models';
import { statusBooleanConverter, StatusType } from './status-boolean-converter';

export const friendshipStatus: FollowerUserTypeResolvers['friendshipStatus'] = async ({ _id }, _, { userId }) => {
  const followingPromise = FollowerModel.findOne({ followerId: userId, targetId: _id });
  const incomingRequestPromise =
    userId == _id
      ? new Promise((resolve) => {
          resolve(null);
        })
      : RequestModel.findOne({ to: userId, from: _id });

  const followedByPromise =
    userId == _id
      ? new Promise((resolve) => {
          resolve(true);
        })
      : FollowerModel.findOne({ followerId: _id, targetId: userId });

  const outgoingRequestPromise = RequestModel.findOne({ from: userId, to: _id });
  const [fIng, i, o, fBy]: StatusType[] = await Promise.all([followingPromise, incomingRequestPromise, outgoingRequestPromise, followedByPromise]);
  return statusBooleanConverter({ arg: [fIng, i, o, fBy] });
};
