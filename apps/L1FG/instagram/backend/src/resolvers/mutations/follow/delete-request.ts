import { MutationResolvers } from '../../../generated';
import { NotificationModel, RequestModel } from '../../../models';

export const deleteRequest: MutationResolvers['deleteRequest'] = async (_, { targetId }, { userId }) => {
  await RequestModel.findOneAndDelete({ to: targetId, from: userId });
  await NotificationModel.deleteMany({ categoryType: 'REQUEST', ownerId: targetId, userId: userId });

  return { isFollowed: false, isRequested: false };
};
