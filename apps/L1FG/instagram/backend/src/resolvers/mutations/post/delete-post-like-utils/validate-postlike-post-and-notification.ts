import { PostLikeWithNotificationIdInput } from '../../../../generated';
import { NotificationModel, PostLikeModal, PostModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { NotFoundError } from '../../../../utils/error';

// eslint-disable-next-line complexity
export const validatePostlikePostAndNotification = async ({ input }: { input: PostLikeWithNotificationIdInput }) => {
  const { postLikeid, postId, notificationId } = input;
  try {
    const foundPostLike = await PostLikeModal.findById(postLikeid);
    if (!foundPostLike) {
      throw new NotFoundError('зүрх дараагүй байна');
    }
    const foundPost = await PostModel.findById(postId);
    if (!foundPost) {
      throw new NotFoundError('пост олдсонгүй');
    }
    const foundNotification = await NotificationModel.findById(notificationId);
    if (!foundNotification) {
      throw new NotFoundError('мэдээлэл олдсонгүй');
    }
  } catch (error) {
    throw catchError(error);
  }
};
