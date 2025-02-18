/*eslint-disable*/
import mongoose from 'mongoose';
import { QueryResolvers } from '../../../generated';
import { authenticate } from '../../../utils/authenticate';
import { FollowerModel } from '../../../models';
import { catchError } from '../../../utils/catch-error';

export const getFollowers: QueryResolvers['getFollowers'] = async (_, { input }, { userId }) => {
  authenticate(userId);
  try {
    let hasNextPage = false;
    const { after, first, searchingUserId } = input;
    const filter: {
      [key: string]: unknown;
    } = {
      targetId: searchingUserId,
    };
    if (after) {
      const decodedCursor = Buffer.from(after, 'base64').toString('ascii');
      filter._id = { $lt: new mongoose.Types.ObjectId(decodedCursor) };
    }
    const followers = await FollowerModel.find(filter)
      .sort({ _id: -1 })
      .limit(first + 1);
    if (followers.length > first) {
      hasNextPage = true;
      followers.pop();
    }
    const edges = followers.map((follower) => ({
      cursor: Buffer.from(follower._id as string).toString('base64'),
      node: follower,
    }));
    if (edges.length <= 0) {
      return {
        edges: edges,
        pageInfo: {
          startCursor: '',
          endCursor: '',
          hasNextPage,
        },
      };
    }
    const returnData = {
      edges: edges,
      pageInfo: {
        startCursor: edges[0].cursor,
        endCursor: edges[edges.length - 1].cursor,
        hasNextPage,
      },
    };
    return returnData;
  } catch (error) {
    throw catchError(error);
  }
};
