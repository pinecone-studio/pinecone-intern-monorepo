import { MutationResolvers } from '../../../generated';
import { NotificationModel, PostLikeModal, PostModel } from '../../../models';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';
import { validatePostlikePostAndNotification } from './delete-post-like-utils/validate-postlike-post-and-notification';

export const deletePostLike: MutationResolvers['deletePostLike'] = async (_, { input }, { userId }) => {
  const { postId, ownerUserId } = input;
  authenticate(userId);
  await validatePostlikePostAndNotification({ input: { userId, postId } });
  let likedPost;
  try {
    likedPost = await PostLikeModal.findOneAndDelete({
      userId: userId,
      postId: postId,
    });
    await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } }, { new: true });
    await NotificationModel.findOneAndDelete({
      userId: userId,
      contentPostId: postId,
      ownerId: ownerUserId,
      categoryType: 'POST_LIKE',
    });
  } catch (error) {
    throw catchError(error);
  }
  return likedPost;
};
