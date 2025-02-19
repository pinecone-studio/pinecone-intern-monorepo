/* eslint-disable complexity */
import { QueryResolvers } from '../../../generated';
import { PostModel } from '../../../models';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';
import mongoose from 'mongoose';
export const getSmallPosts: QueryResolvers['getSmallPosts'] = async (_, { input }, { userId }) => {
  authenticate(userId);
  try {
    let hasNextPage = false;
    const { after, first } = input;
    const filter: {
      [key: string]: unknown;
    } = {};
    if (after) {
      const decodedCursor = Buffer.from(after, 'base64').toString('ascii');
      filter._id = { $lt: new mongoose.Types.ObjectId(decodedCursor) };
    }
    const posts = await PostModel.find(filter)
      .sort({ _id: -1 })
      .limit(first + 1);
    if (posts.length > first) {
      hasNextPage = true;
      posts.pop();
    }
    const edges = posts.map((post) => ({
      cursor: Buffer.from(post._id as string).toString('base64'),
      node: post,
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
