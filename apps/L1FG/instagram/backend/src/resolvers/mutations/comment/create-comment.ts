import { Comment, MutationResolvers } from '../../../generated';
import { PostModel } from '../../../models';
import { CommentModel } from '../../../models/comment.model';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';
import { CreationError } from '../../../utils/error';

export const createComment: MutationResolvers['createComment'] = async (_, { input }, { userId }) => {
  authenticate(userId);
  try {
    const { postId, comment } = input;
    const comments: Comment | null = await CommentModel.create({
      userId,
      postId,
      comment,
    });

    if (!comments) throw new CreationError('Failed Comment');
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
