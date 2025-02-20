import { MutationResolvers } from '../../../generated';
import { NotificationModel } from '../../../models';

export const updateIsRead: MutationResolvers['updateIsRead'] = async (_, __, { userId }) => {
  const existNotification = await NotificationModel.findOne({ ownerId: userId });
  console.log('exist', existNotification);

  if (existNotification) {
    await NotificationModel.updateMany({ ownerId: userId }, { isRead: true }, { new: true });

    return { isRead: true };
  }

  return { isRead: false };
};
