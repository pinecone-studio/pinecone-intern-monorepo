import { MutationResolvers } from '@/graphql/generated';
import { CommentsModel } from '@/models/comment.model';
import { errorTypes, graphqlErrorHandler } from '../error';
export const publishComment: MutationResolvers['publishComment'] = async (_, { createInput }) => {
  try {
    const newComment = await CommentsModel.create(createInput);
    return newComment._id;
  } catch (e) {
    throw graphqlErrorHandler({ message: `cannot create comment ${e}` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
