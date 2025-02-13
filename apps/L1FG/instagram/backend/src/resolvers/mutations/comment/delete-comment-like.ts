import { MutationResolvers } from '../../../generated';
import { CommentLikeModel, NotificationModel } from '../../../models';
import { CommentModel } from '../../../models/comment.model';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';
import { validateCommentLikeWhenDeleting } from './delete-comment-like-utils/validate-comment-like-when-deleting';

export const deleteCommentLike: MutationResolvers['deleteCommentLike'] = async (_, { input }, { userId }) => {
  const { commentId, postId, ownerUserId } = input;
  authenticate(userId);
  await validateCommentLikeWhenDeleting({
    input: {
      ...input,
      userId: userId,
    },
  });
  let commentLike;
  try {
    commentLike = await CommentLikeModel.findOneAndDelete({
      userId: userId,
      commentId: input.commentId,
    });
    await CommentModel.findByIdAndUpdate(
      commentId,
      {
        $inc: { likeCount: -1 },
      },
      { new: true }
    );
    await NotificationModel.findOneAndDelete({
      userId,
      ownerId: ownerUserId,
      contentPostId: postId,
      contentCommentId: commentId,
      categoryType: 'COMMENT_LIKE',
    });
  } catch (error) {
    throw catchError(error);
  }
  return commentLike;
};
