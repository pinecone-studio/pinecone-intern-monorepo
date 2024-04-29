import { QueryResolvers } from '../../generated';
import { CommentsModel } from '../../../models/comment.model';
import { GraphQLError } from 'graphql';

export const getComments: QueryResolvers['getComment'] = async () => {
  try {
    const comments = await CommentsModel.find({});
    return comments;
  } catch (error) {
    throw new GraphQLError('Error in GetComments Query');
  }
};
