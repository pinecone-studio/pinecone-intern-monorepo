import { errorTypes, graphqlErrorHandler } from '../../error';
import { MutationResolvers, CommentStatus } from '@/graphql/generated/index';
import { CommentsModel } from '@/models/comment.model';

export const setCommentStatusToNormal: MutationResolvers['setCommentStatusToNormal'] = async (_, { id }) => {
  try {
    const comment = await CommentsModel.findByIdAndUpdate(id, { status: CommentStatus.Normal });
    return comment._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot convert comment status to normal` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
