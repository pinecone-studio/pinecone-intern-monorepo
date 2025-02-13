import mongoose from 'mongoose';
import { QueryResolvers } from '../../../generated';
import { PostModel } from '../../../models';
import { catchError } from '../../../utils/catch-error';
import { authenticate } from '../../../utils/authenticate';

export const getPosts: QueryResolvers['getPosts'] = async (_, { input }, { userId }) => {
  authenticate(userId);
  try {
    let hasNextPage = false;
    const { searchingUserId, after, first } = input;
    const filter: {
      [key: string]: unknown;
    } = {
      userId: searchingUserId,
    };
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
