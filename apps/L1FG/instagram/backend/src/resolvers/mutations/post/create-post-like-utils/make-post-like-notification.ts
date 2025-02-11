import { PostLike } from '../../../../generated';
import { NotificationModel, PostLikeModal } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
type input = {
  userId: string;
  ownerUserId: string;
  postId: string;
};
export const makePostLikeNotification = async ({ input, postLike }: { input: input; postLike: PostLike }) => {
  try {
    const { userId, ownerUserId, postId } = input;
    await NotificationModel.create({
      userId: userId,
      ownerId: ownerUserId,
      contentPostId: postId,
      categoryType: 'POST_LIKE',
    });
  } catch (error) {
    await PostLikeModal.findByIdAndDelete(postLike._id);
    throw catchError(error);
  }
};
