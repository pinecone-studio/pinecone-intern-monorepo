import { MutationResolvers } from '@/graphql/generated';
import { CommentsModel } from '@/models/comment.model';
import { errorTypes, graphqlErrorHandler } from '../error';
export const publishComment: MutationResolvers['publishComment'] = async (_, { createInput }) => {
  const { entityType, entityId, comment, name, email, articleId } = createInput;
  try {
    const newComment = await CommentsModel.create({ name, comment, email, entityId, entityType, articleId });
    return newComment._id;
  } catch (e) {
    throw graphqlErrorHandler({ message: 'cannot create comment' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
