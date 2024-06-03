import { QueryResolvers } from '@/graphql/generated/index';
import { CommentsModel } from '@/models/comment.model';
import { GraphQLError } from 'graphql/error';

export const getComments: QueryResolvers['getComments'] = async (_, { input }) => {
  const { limit, offset, status } = input;
  try {
    const comments = await CommentsModel.find({ status })
      .limit(limit)
      .skip(offset * limit);
    return comments.reverse();
  } catch (error) {
    throw new GraphQLError('Error in get comments query');
  }
};
