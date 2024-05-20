import { MutationResolvers } from '@/graphql/generated/index';
import { CommentsModel } from '@/models/comment.model';
import { errorTypes, graphqlErrorHandler } from '../../error';
import { filterWords } from '@/middlewares/filter-words';
export const publishComment: MutationResolvers['publishComment'] = async (_, { createInput }) => {
  const { articleId, entityId, entityType, email, name, comment } = createInput;
  const filteredComment = await filterWords(comment);
  try {
    const newComment = await CommentsModel.create({ comment: filteredComment, articleId, entityId, entityType, email, name });
    return newComment._id;
  } catch (e) {
    throw graphqlErrorHandler({ message: `cannot create comment` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
