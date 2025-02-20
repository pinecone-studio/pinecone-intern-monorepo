import mongoose from 'mongoose';
import { QueryResolvers } from '../../../generated';
import { FollowerModel, UserModel } from '../../../models';
import { getUserStoryInfo } from './get-user-story-info';
import { catchError } from '../../../utils/catch-error';
import { UnauthenticatedError } from '../../../utils/error';

export const getPreviewAllStories: QueryResolvers['getPreviewAllStories'] = async (_, __, { userId }) => {
  if (!userId) {
    throw new UnauthenticatedError('Та нэвтэрнэ үү');
  }
  try {
    const objectUserId = new mongoose.Types.ObjectId(userId);
    const currentTime = new Date();
    const viewer = await UserModel.findById(userId);
    const userStoryInfo = await getUserStoryInfo({ userId: userId });
    const result = await FollowerModel.aggregate([
      {
        $match: {
          followerId: objectUserId,
        },
      },
      {
        $lookup: {
          from: 'stories',
          let: { targetId: '$targetId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$userId', '$$targetId'],
                    },
                    {
                      $gt: ['$expiringAt', currentTime],
                    },
                  ],
                },
              },
            },
          ],
          as: 'items',
        },
      },
      {
        $match: {
          $expr: {
            $gt: [
              {
                $size: '$items',
              },
              0,
            ],
          },
        },
      },
      {
        $set: {
          items: {
            $sortArray: {
              input: '$items',
              sortBy: { expiringAt: 1 },
            },
          },
          latestStoryTimestamp: {
            $ifNull: [
              {
                $arrayElemAt: ['$items.expiringAt', -1],
              },
              0,
            ],
          },
          latestStoryId: {
            $arrayElemAt: ['$items._id', -1],
          },
        },
      },
      {
        $sort: {
          latestStoryTimestamp: -1,
        },
      },
      {
        $project: {
          _id: '$targetId',
          userId: '$targetId',
          latestStoryTimestamp: 1,
          items: 1,
          latestStoryId: 1,
        },
      },
    ]);
    return {
      storyTray: [...userStoryInfo, ...result],
      viewer: viewer,
    };
  } catch (error) {
    throw catchError(error);
  }
};
