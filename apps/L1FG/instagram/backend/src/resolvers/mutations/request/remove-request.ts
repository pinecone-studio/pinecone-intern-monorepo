import { MutationResolvers } from '../../../generated';
import { NotificationModel, RequestModel } from '../../../models';

export const removeRequest: MutationResolvers['removeRequest'] = async (_, { followerId }, { userId }) => {
  const request = await RequestModel.findOne({ from: followerId, to: userId });

  await NotificationModel.findOneAndDelete({ categoryType: 'REQUEST', ownerId: userId, userId: followerId });
  await RequestModel.findOneAndDelete({ from: followerId, to: userId });

  return request;
};
