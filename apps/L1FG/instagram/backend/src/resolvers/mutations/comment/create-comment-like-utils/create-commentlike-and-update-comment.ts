import { CommentLikeModel } from '../../../../models';
import { CommentModel } from '../../../../models/comment.model';
import { catchError } from '../../../../utils/catch-error';
import { CreationError } from '../../../../utils/error';
type input = {
  userId: string | null;
  commentId: string;
};
export const createCommentlikeAndUpdateComment = async ({ input }: { input: input }) => {
  try {
    const { userId, commentId } = input;
    const commentLike = await CommentLikeModel.create({
      userId,
      commentId,
    });
    if (!commentLike) throw new CreationError('Коммент дээр зүрх дарсангүй');
    const updatedCommentLike = await CommentModel.findByIdAndUpdate(commentId, { $inc: { likeCount: 1 } }, { new: true });
    if (!updatedCommentLike) {
      await CommentLikeModel.findByIdAndDelete(commentLike._id);
      throw new CreationError('Коммент дээр зүрх дарсангүй');
    }
    return commentLike;
  } catch (error) {
    throw catchError(error);
  }
};
