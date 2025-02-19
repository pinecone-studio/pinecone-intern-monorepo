/* eslint-disable complexity */
import mongoose from 'mongoose';
import { QueryResolvers } from '../../../generated';
import { CommentModel } from '../../../models/comment.model';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';

export const getComments: QueryResolvers['getComments'] = async (_, { input }, { userId }) => {
  authenticate(userId);
  try {
    let hasNextPage = false;
    const { after, first, postId } = input;
    const filter: {
      [key: string]: unknown;
    } = {
      postId: postId,
    };
    if (after) {
      const decodedCursor = Buffer.from(after, 'base64').toString('ascii');
      filter._id = { $lt: new mongoose.Types.ObjectId(decodedCursor) };
    }
    const posts = await CommentModel.find(filter)
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
