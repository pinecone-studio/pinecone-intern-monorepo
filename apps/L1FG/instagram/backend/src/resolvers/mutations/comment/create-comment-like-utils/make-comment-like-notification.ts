import { CommentLike } from '../../../../generated';
import { CommentLikeModel, NotificationModel } from '../../../../models';
import { CommentModel } from '../../../../models/comment.model';
import { catchError } from '../../../../utils/catch-error';
import { CreationError } from '../../../../utils/error';
type input = {
  userId: string | null;
  ownerUserId: string;
  postId: string;
  commentId: string;
};
export const makeCommentLikeNotification = async ({ commentLike, input }: { commentLike: CommentLike; input: input }) => {
  try {
    const { userId, ownerUserId, postId, commentId } = input;
    const newNotification = await NotificationModel.create({
      userId,
      ownerId: ownerUserId,
      contentPostId: postId,
      contentCommentId: commentId,
      categoryType: 'COMMENT_LIKE',
    });
    if (!newNotification) {
      await CommentLikeModel.findByIdAndDelete(commentLike._id);
      await CommentModel.findByIdAndUpdate(commentId, { $inc: { likeCount: -1 } }, { new: true });
      throw new CreationError('Мэдээлэл үүсэхэд алдаа гарлаа');
    }
  } catch (error) {
    throw catchError(error);
  }
};
