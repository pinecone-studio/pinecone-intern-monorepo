/*eslint-disable*/
import { NotificationModel, PostModel, UserModel } from '../../../../models';
import { CommentModel } from '../../../../models/comment.model';
import { catchError } from '../../../../utils/catch-error';
import { NotFoundError, UserNotFoundError } from '../../../../utils/error';

type input = {
  ownerUserId: string;
  commentId: string;
  userId: string | null;
  postId: string;
};
export const validateCommentLikeWhenDeleting = async ({ input }: { input: input }) => {
  try {
    const { ownerUserId, commentId, userId, postId } = input;
    const ownerUserPromise = UserModel.findById(ownerUserId);
    const commentPromise = CommentModel.findById(commentId);
    const postPromise = PostModel.findById(postId);
    const commentLikeNotificationPromise = NotificationModel.findOne({
      userId,
      ownerId: ownerUserId,
      contentPostId: postId,
      contentCommentId: commentId,
      categoryType: 'COMMENT_LIKE',
    });
    const [ownerUser, comment, post, commentLikeNotification] = await Promise.all([ownerUserPromise, commentPromise, postPromise, commentLikeNotificationPromise]);
    if (!commentLikeNotification) {
      throw new NotFoundError('Коммент дээр зүрх дараагүй байна');
    }
    if (!ownerUser) {
      throw new UserNotFoundError('Постны эзэн байхгүй байна');
    }
    if (!comment) {
      throw new NotFoundError('Коммент олдсонгүй');
    }
    if (!post) {
      throw new NotFoundError('пост олдсонгүй');
    }
  } catch (error) {
    throw catchError(error);
  }
};
