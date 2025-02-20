import { MutationResolvers } from '../../../generated';
import { CommentLikeModel, NotificationModel, PostModel } from '../../../models';
import { CommentModel } from '../../../models/comment.model';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';
import { NotFoundError } from '../../../utils/error';

export const deleteComment: MutationResolvers['deleteComment'] = async (_, { commentId }, { userId }) => {
  authenticate(userId);

  try {
    const deleteComment = await CommentModel.findOneAndDelete({
      _id: commentId,
    });

    if (!deleteComment) {
      throw new NotFoundError('comment delete failed.');
    }

    await PostModel.findByIdAndUpdate(userId, { $inc: { commentCount: -1 } });
    await NotificationModel.deleteMany({
      contentCommentId: commentId,
    });
    await CommentLikeModel.deleteMany({
      commentId: deleteComment._id,
    });
    return deleteComment;
  } catch (error) {
    throw catchError(error);
  }
};
