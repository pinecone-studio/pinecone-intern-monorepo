import { CommentStatus, MutationResolvers } from '../../../generated/index';
import { errorTypes, graphqlErrorHandler } from '../../error';
import { CommentsModel } from '../../../../models/comment.model';

export const hideCommentByAdmin: MutationResolvers['hideCommentByAdmin'] = async (_, { hideInput }) => {
  try {
    const hiddenComment = await CommentsModel.findByIdAndUpdate(hideInput._id, { status: CommentStatus.Hidden });
    return hiddenComment._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot hide comment by admin` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
