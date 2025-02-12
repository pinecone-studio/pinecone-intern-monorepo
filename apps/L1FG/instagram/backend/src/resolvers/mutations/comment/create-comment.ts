import { Comment, MutationResolvers } from '../../../generated';
import { NotificationModel, PostModel } from '../../../models';
import { CommentModel } from '../../../models/comment.model';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';
import { CreationError } from '../../../utils/error';

export const createComment: MutationResolvers['createComment'] = async (_, { input }, { userId }) => {
  authenticate(userId);
  try {
    const { postId, comment, ownerId } = input;

    const comments: Comment = await CommentModel.create({
      userId,
      postId,
      comment,
    });

    if (!comments) throw new CreationError('Failed Comment');

    await NotificationModel.create({
      contentCommentId: comments._id,
      contentPostId: postId,
      ownerId,
      categoryType: 'POST_COMMENT',
      userId,
    });

    const updatedComment = await PostModel.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } }, { new: true });
    if (!updatedComment) {
      await CommentModel.findByIdAndDelete(comments._id);
      throw new CreationError('Failed comment');
    }
    return comments;
  } catch (error) {
    throw catchError(error);
  }
};
