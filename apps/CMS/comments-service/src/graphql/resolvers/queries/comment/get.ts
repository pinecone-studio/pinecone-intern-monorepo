import { QueryResolvers } from '../../../generated';
import { CommentsModel } from '../../../../models/comment.model';
import { GraphQLError } from 'graphql/error';

export const getComments: QueryResolvers['getComments'] = async () => {
  try {
    const comments = await CommentsModel.find({ status: 'NORMAL' });
    return comments;
  } catch (error) {
    throw new GraphQLError('Error in get comments query');
  }
};
