import mongoose from 'mongoose';
import { QueryResolvers } from '../../../generated';
import { authenticate } from '../../../utils/authenticate';
import { UserModel } from '../../../models';
import { catchError } from '../../../utils/catch-error';

export const getOneStory: QueryResolvers['getOneStory'] = async (_, { targetUserId }, { userId }) => {
  authenticate(userId);
  try {
    const objectUserId = new mongoose.Types.ObjectId(targetUserId);
    const currentTime = new Date();
    const result = await UserModel.aggregate([
      {
        $match: {
          _id: objectUserId,
        },
      },
      {
        $lookup: {
          from: 'stories',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$userId', '$$userId'],
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
              sortBy: { expiringAt: -1 },
            },
          },
          latestStoryTimestamp: {
            $ifNull: [
              {
                $arrayElemAt: ['$items.expiringAt', 0],
              },
              0,
            ],
          },
          latestStoryId: {
            $arrayElemAt: ['$items._id', 0],
          },
        },
      },
      {
        $project: {
          _id: objectUserId,
          userId: objectUserId,
          latestStoryTimestamp: 1,
          items: 1,
          latestStoryId: 1,
        },
      },
    ]);
    return result;
  } catch (error) {
    throw catchError(error);
  }
};
