import { PostLikeModal, PostModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { NotFoundError } from '../../../../utils/error';

export const validatePostlikePostAndNotification = async ({ input }: { input: { postId: string; userId: string | null } }) => {
  const { postId, userId } = input;
  try {
    const foundPost = await PostModel.findById(postId);
    if (!foundPost) {
      throw new NotFoundError('пост олдсонгүй');
    }
    const foundPostLike = await PostLikeModal.findOne({
      postId: postId,
      userId: userId,
    });
    if (!foundPostLike) {
      throw new NotFoundError('постон дээр зүрх дараагүй байна');
    }
  } catch (error) {
    throw catchError(error);
  }
};
