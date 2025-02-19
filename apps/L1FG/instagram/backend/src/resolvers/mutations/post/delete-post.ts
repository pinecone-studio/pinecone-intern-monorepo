import { MutationResolvers } from '../../../generated';
import { PostModel, UserModel } from '../../../models';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';

export const deletePost: MutationResolvers['deletePost'] = async (_, { postId }, { userId }) => {
  authenticate(userId);

  try {
    const deletedPost = await PostModel.findOneAndDelete({
      _id: postId,
      userId: userId,
    });

    if (!deletedPost) {
      throw new Error('Post deletion failed: No such post found or unauthorized.');
    }

    await UserModel.findByIdAndUpdate(userId, { $inc: { postCount: -1 } });

    return deletedPost;
  } catch (error) {
    throw catchError(error);
  }
};
