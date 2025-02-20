import mongoose from 'mongoose';
import { QueryResolvers } from '../../../generated';
import { FollowerModel } from '../../../models';
import { catchError } from '../../../utils/catch-error';
import { UnauthenticatedError } from '../../../utils/error';

export const searchFollowings: QueryResolvers['searchFollowings'] = async (_, { userName }, { userId }) => {
  if (!userId) throw new UnauthenticatedError('та нэвтэрнэ үү');
  try {
    const objectUserId = new mongoose.Types.ObjectId(userId);
    const followings = await FollowerModel.aggregate([
      {
        $match: {
          followerId: objectUserId,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'targetId',
          foreignField: '_id',
          as: 'followings',
        },
      },
      {
        $unwind: '$followings',
      },
      {
        $match: {
          'followings.userName': { $regex: userName, $options: 'i' },
        },
      },
      {
        $project: {
          _id: 1,
          followerId: 1,
          targetId: 1,
        },
      },
    ]);
    const edges = followings.map((following) => ({
      cursor: '',
      node: following,
    }));
    const returnData = {
      edges: edges,
      pageInfo: {
        startCursor: '',
        endCursor: '',
        hasNextPage: false,
      },
    };
    return returnData;
  } catch (error) {
    throw catchError(error);
  }
};
