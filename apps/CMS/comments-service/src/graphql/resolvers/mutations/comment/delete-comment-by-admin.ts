import { MutationResolvers } from '@/graphql/generated/index';
import { errorTypes, graphqlErrorHandler } from '../../error';
import { CommentsModel } from '@/models/comment.model';

export const deleteCommentByAdmin: MutationResolvers['deleteCommentByAdmin'] = async (_, { id }) => {
  try {
    const deletedComment = await CommentsModel.findByIdAndUpdate(id, { status: 'DELETED' });
    return deletedComment._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot remove comment by admin` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
