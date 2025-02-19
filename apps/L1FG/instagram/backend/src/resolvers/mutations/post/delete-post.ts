import { MutationResolvers } from '../../../generated';
import { CommentLikeModel, NotificationModel, PostLikeModal, PostModel, UserModel } from '../../../models';
import { CommentModel } from '../../../models/comment.model';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';

export const deletePost: MutationResolvers['deletePost'] = async (_, { postId }, { userId }) => {
  authenticate(userId);

  try {
    const deletedPost = await PostModel.findByIdAndDelete({
      _id: postId,
      userId: userId,
    });

    if (!deletedPost) {
      throw new Error('Post deletion failed: No such post found ');
    }
    await UserModel.findByIdAndUpdate(userId, { $inc: { postCount: -1 } });
    await NotificationModel.deleteMany({
      contentPostId: postId,
    });
    await PostLikeModal.deleteMany({
      postId,
    });
    const willDeleteComments = await CommentModel.find({ postId });
    await CommentModel.deleteMany({ postId });
    const deleteCommentLikePromises = willDeleteComments.map((deletedComment) => CommentLikeModel.findOneAndDelete({ commentId: deletedComment._id }));
    await Promise.all(deleteCommentLikePromises);
    return deletedPost;
  } catch (error) {
    throw catchError(error);
  }
};
