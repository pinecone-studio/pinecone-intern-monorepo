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
  weekAgo.setHours(0, 0, 0, 0);

  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  monthAgo.setHours(0, 0, 0, 0);

  const ownerId = new mongoose.Types.ObjectId(userId);

  const notifications = await NotificationModel.aggregate([
    { $match: { ownerId } },
    {
      $project: {
        categoryType: 1,
        createdAt: 1,
        userId: 1,
        ownerId: 1,
        contentPostId: 1,
        contentCommentId: 1,
        isRead: 1,
        period: {
          $cond: {
            if: { $gte: ['$createdAt', todayStart] },
            then: 'today',
            else: {
              $cond: {
                if: { $gte: ['$createdAt', weekAgo] },
                then: 'thisWeek',
                else: {
                  $cond: {
                    if: { $gte: ['$createdAt', monthAgo] },
                    then: 'thisMonth',
                    else: 'earlier',
                  },
                },
              },
            },
          },
        },
        sortOrder: {
          $switch: {
            branches: [
              { case: { $eq: ['$categoryType', 'POST_COMMENT'] }, then: 1 },
              { case: { $eq: ['$categoryType', 'POST_LIKE'] }, then: 2 },
              { case: { $eq: ['$categoryType', 'REQUEST'] }, then: 3 },
            ],
            default: 4,
          },
        },
      },
    },
    { $sort: { createdAt: -1 } },
    { $limit: 20 },
    {
      $group: {
        _id: '$period',
        postLike: { $push: { $cond: [{ $eq: ['$categoryType', 'POST_LIKE'] }, '$$ROOT', '$$REMOVE'] } },
        comment: { $push: { $cond: [{ $eq: ['$categoryType', 'POST_COMMENT'] }, '$$ROOT', '$$REMOVE'] } },
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
