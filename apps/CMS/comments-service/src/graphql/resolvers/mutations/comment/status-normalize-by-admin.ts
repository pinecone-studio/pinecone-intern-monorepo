import { errorTypes, graphqlErrorHandler } from '../../error';
import { MutationResolvers } from '../../../generated';
import { CommentsModel } from '../../../../models/comment.model';

export const setCommentStatusToNormal: MutationResolvers['setCommentStatusToNormal'] = async (_, { setCommentStatusInput }) => {
  try {
    const comment = await CommentsModel.findByIdAndUpdate(setCommentStatusInput._id, { status: 'NORMAL' });
    return comment._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot convert comment status to normal` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
