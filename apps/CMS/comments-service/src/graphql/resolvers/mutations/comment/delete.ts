import { MutationResolvers } from '@/graphql/generated';
import { CommentsModel } from '@/models/comment.model';
import { errorTypes, graphqlErrorHandler } from '../../error';
import { accessTokenAuth } from '@/middlewares/auth-token';

export const deleteComment: MutationResolvers['deleteComment'] = async (_, { deleteInput }, { req }) => {
  await accessTokenAuth(req);
  try {
    const deletedComment = await CommentsModel.findByIdAndDelete(deleteInput._id);
    return deletedComment._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot delete comment` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
