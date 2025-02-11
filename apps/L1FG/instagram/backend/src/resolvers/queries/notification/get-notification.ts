import mongoose from 'mongoose';
import { QueryResolvers } from '../../../generated';
import { NotificationModel } from '../../../models';

export const getNotification: QueryResolvers['getNotification'] = async (_, __, { userId }) => {
  if (!userId) {
    throw new Error('UnAuthorized');
  }
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);

  const ownerId = new mongoose.Types.ObjectId(userId);

  const notifications = await NotificationModel.aggregate([
    { $match: { ownerId } },
    {
      $project: {
        categoryType: 1,
        createdAt: 1,
        userId: 1,
        contentPostId: 1,
        isRead: 1,
        period: {
          $switch: {
            branches: [
              { case: { $gte: ['$createdAt', todayStart] }, then: 'today' },
              { case: { $gte: ['$createdAt', weekAgo] }, then: 'thisWeek' },
              { case: { $gte: ['$createdAt', monthAgo] }, then: 'thisMonth' },
            ],
            default: 'earlier',
          },
        },
      },
    },
    {
      $group: {
        _id: '$period',
        postLike: { $push: { $cond: [{ $eq: ['$categoryType', 'POST_LIKE'] }, '$$ROOT', '$$REMOVE'] } },
        comment: { $push: { $cond: [{ $eq: ['$categoryType', 'COMMENT_POST'] }, '$$ROOT', '$$REMOVE'] } },
        request: { $push: { $cond: [{ $eq: ['$categoryType', 'REQUEST'] }, '$$ROOT', '$$REMOVE'] } },
      },
    },
    {
      $match: {
        $or: [{ postLike: { $ne: [] } }, { comment: { $ne: [] } }, { request: { $ne: [] } }],
      },
    },
  ]);

  return notifications.reduce((acc, group) => {
    acc[group._id] = {
      postLike: group.postLike.length > 0 ? group.postLike : null,
      comment: group.comment.length > 0 ? group.comment : null,
      request: group.request.length > 0 ? group.request : null,
    };
    return acc;
  }, {});
};
