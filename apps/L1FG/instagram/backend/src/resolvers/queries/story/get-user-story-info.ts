import mongoose from 'mongoose';
import { UserModel } from '../../../models';
export const getUserStoryInfo = async ({ userId }: { userId: string }) => {
  const objectUserId = new mongoose.Types.ObjectId(userId);
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
};
