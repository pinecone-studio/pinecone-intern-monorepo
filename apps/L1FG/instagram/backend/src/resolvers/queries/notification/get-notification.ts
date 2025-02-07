import { QueryResolvers } from '../../../generated';
import { NotificationModel } from '../../../models';

export const getNotification: QueryResolvers['getNotification'] = async (_, __, { userId }) => {
  const notifications = await NotificationModel.find({ ownerId: userId }).sort({ createdAt: -1 });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);

  const todayTime = notifications.filter((n) => new Date(n.createdAt) >= todayStart);
  const thisWeekTime = notifications.filter((n) => new Date(n.createdAt) >= weekAgo && new Date(n.createdAt) < todayStart);
  const monthAgoTime = notifications.filter((n) => new Date(n.createdAt) >= monthAgo && new Date(n.createdAt) < weekAgo);
  const earlierTime = notifications.filter((n) => new Date(n.createdAt) < monthAgo);

  return {
    today: {
      postLike: todayTime.filter((t) => t.categoryType === 'POST_LIKE'),
      comment: todayTime.filter((t) => t.categoryType === 'COMMENT_POST'),
      request: todayTime.filter((t) => t.categoryType === 'REQUEST'),
    },
    thisWeek: {
      postLike: thisWeekTime.filter((t) => t.categoryType === 'POST_LIKE'),
      comment: thisWeekTime.filter((t) => t.categoryType === 'COMMENT_POST'),
      request: thisWeekTime.filter((t) => t.categoryType === 'REQUEST'),
    },
    monthAgo: {
      postLike: monthAgoTime.filter((t) => t.categoryType === 'POST_LIKE'),
      comment: monthAgoTime.filter((t) => t.categoryType === 'COMMENT_POST'),
      request: monthAgoTime.filter((t) => t.categoryType === 'REQUEST'),
    },
    earlier: {
      postLike: earlierTime.filter((t) => t.categoryType === 'POST_LIKE'),
      comment: earlierTime.filter((t) => t.categoryType === 'COMMENT_POST'),
      request: earlierTime.filter((t) => t.categoryType === 'REQUEST'),
    },
  };
};
