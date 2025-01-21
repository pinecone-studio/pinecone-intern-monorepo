import { FollowerUserTypeResolvers } from '../../generated';
import { FollowerModel, RequestModel } from '../../models';
import { statusBooleanConverter, StatusType } from './status-boolean-converter';

export const friendshipStatus: FollowerUserTypeResolvers['friendshipStatus'] = async ({ _id }, _, { userId }) => {
  const followingPromise = FollowerModel.findOne({ followerId: userId });
  const incomingRequestPromise =  userId==_id ? new Promise((resolve)=>{
    resolve(null)
  }) : RequestModel.findOne({ to: userId });
  const outgoingRequestPromise = RequestModel.findOne({ from: _id });
  const [f, i, o]:StatusType[] = await Promise.all([followingPromise, incomingRequestPromise, outgoingRequestPromise]);
  return statusBooleanConverter({arg:[f,i,o]})
};
