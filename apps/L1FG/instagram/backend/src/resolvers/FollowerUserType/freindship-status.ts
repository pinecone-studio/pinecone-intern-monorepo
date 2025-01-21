import { FollowerUserTypeResolvers } from '../../generated';
import { FollowerModel, RequestModel } from '../../models';

export const friendshipStatus: FollowerUserTypeResolvers['friendshipStatus'] = async ({ _id }, _, { userId }) => {
  const followingPromise = FollowerModel.findOne({ followerId: userId });
  const incomingRequestPromise = RequestModel.findOne({ to: userId });
  const outgoingRequestPromise = RequestModel.findOne({ from: _id });
  const [f, i, o] = await Promise.all([followingPromise, incomingRequestPromise, outgoingRequestPromise]);
  const following = f ? true : false;
  const incomingRequest = i ? true : false;
  const outgoingRequest = o ? true : false;
  return {
    following,
    incomingRequest,
    outgoingRequest,
  };
};
