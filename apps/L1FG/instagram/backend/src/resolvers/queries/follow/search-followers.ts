import mongoose from 'mongoose';
import { QueryResolvers } from '../../../generated';
import { FollowerModel } from '../../../models';
import { catchError } from '../../../utils/catch-error';
import { UnauthenticatedError } from '../../../utils/error';

export const searchFollowers: QueryResolvers['searchFollowers'] = async (_, { userName }, { userId }) => {
  if (!userId) throw new UnauthenticatedError('та нэвтэрнэ үү');
  try {
    const objectUserId = new mongoose.Types.ObjectId(userId);
    const followers = await FollowerModel.aggregate([
      {
        $match: {
          targetId: objectUserId,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followerId',
          foreignField: '_id',
          as: 'followers',
        },
      },
      {
        $unwind: '$followers',
      },
      {
        $match: {
          'followers.userName': { $regex: userName, $options: 'i' },
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
    const edges = followers.map((follower) => ({
      cursor: '',
      node: follower,
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
