import { PostLikeWithNotificationIdInput } from '../../../../generated';
import { NotificationModel, PostModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { NotFoundError } from '../../../../utils/error';

export const validatePostlikePostAndNotification = async ({ input }: { input: PostLikeWithNotificationIdInput }) => {
  const { postId, notificationId } = input;
  try {
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
