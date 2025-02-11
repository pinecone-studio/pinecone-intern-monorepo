import { PostLikeInput } from '../../../../generated';
import { PostModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { NotFoundError } from '../../../../utils/error';

export const validatePostlikePostAndNotification = async ({ input }: { input: PostLikeInput }) => {
  const { postId } = input;
  try {
    const foundPost = await PostModel.findById(postId);
    if (!foundPost) {
      throw new NotFoundError('пост олдсонгүй');
    }
  } catch (error) {
    throw catchError(error);
  }
};
