import { PostLike } from '../../../../generated';
import { NotificationModel, PostLikeModal, PostModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
type input = {
  userId: string;
  ownerUserId: string;
  postId: string;
};
export const makePostLikeNotification = async ({ input, postLike }: { input: input; postLike: PostLike }): Promise<string> => {
  const { userId, ownerUserId, postId } = input;
  try {
    const { _id } = await NotificationModel.create({
      userId: userId,
      ownerId: ownerUserId,
      contentPostId: postId,
      categoryType: 'POST_LIKE',
    });
    return _id;
  } catch (error) {
    await PostLikeModal.findByIdAndDelete(postLike._id);
    await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } }, { new: true });
    throw catchError(error);
  }
};
