import { QueryResolvers } from '../../../generated';
import { NotificationModel } from '../../../models';

export const getNotification: QueryResolvers['getNotification'] = async (_, __, { userId }) => {
  const notification = await NotificationModel.find({ ownerId: userId });

  return notification;
};
