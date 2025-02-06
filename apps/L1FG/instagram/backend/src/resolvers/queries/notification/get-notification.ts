import { QueryResolvers } from '../../../generated';
import { NotificationModel } from '../../../models';

export const getNotification: QueryResolvers['getNotification'] = async (_, __, { userId }) => {
  const notifications = await NotificationModel.find({ ownerId: userId }).sort({ createdAt: -1 });
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return {
    today: notifications.filter((n) => new Date(n.createdAt) >= todayStart),
    yesterday: notifications.filter((n) => new Date(n.createdAt) >= yesterdayStart && new Date(n.createdAt) < todayStart),
    thisWeek: notifications.filter((n) => new Date(n.createdAt) >= weekAgo && new Date(n.createdAt) < todayStart),
    earlier: notifications.filter((n) => new Date(n.createdAt) < weekAgo),
  };
};
