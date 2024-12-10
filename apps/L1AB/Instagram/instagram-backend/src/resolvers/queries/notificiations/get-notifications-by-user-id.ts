import { QueryResolvers } from '../../../generated';
import { notificationsModel } from '../../../models';

export const getNotificationsByUserId: QueryResolvers['getNotificationsByUserId'] = async (_, { userId }) => {
  const notifications = await notificationsModel.find({ notifiedUserId: userId }).populate('postId').populate('userId');

  return notifications.map((el) => el.toObject());
};
