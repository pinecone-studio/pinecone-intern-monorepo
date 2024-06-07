import { MutationResolvers } from '@/graphql/generated/index';
import { CommentsModel } from '@/models/comment.model';
import { errorTypes, graphqlErrorHandler } from '../../error';
import { filterWords } from '@/middlewares/filter-words';
export const publishComment: MutationResolvers['publishComment'] = async (_, { createInput }) => {
  const { comment, name, email, articleId, entityId, entityType } = createInput;
  const filteredComment = await filterWords(comment);
  try {
    const newComment = await CommentsModel.create({ comment: filteredComment, name, email, articleId, entityId, entityType });
    return newComment._id;
  } catch (e) {
    throw graphqlErrorHandler({ message: `cannot create comment` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
