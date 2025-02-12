import { MutationResolvers } from '../../../generated';
import { NotificationModel, PostLikeModal, PostModel } from '../../../models';
import { authenticate } from '../../../utils/authenticate';
import { catchError } from '../../../utils/catch-error';
import { validatePostlikePostAndNotification } from './delete-post-like-utils/validate-postlike-post-and-notification';

export const deletePostLike: MutationResolvers['deletePostLike'] = async (_, { input }, { userId }) => {
  const { postLikeid, postId, notificationId } = input;
  authenticate(userId);
  await validatePostlikePostAndNotification({ input: input });
  let likedPost;
  try {
    likedPost = await PostLikeModal.findByIdAndDelete(postLikeid);
    await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } }, { new: true });
    await NotificationModel.findByIdAndDelete(notificationId);
  } catch (error) {
    throw catchError(error);
  }
  return likedPost;
};
