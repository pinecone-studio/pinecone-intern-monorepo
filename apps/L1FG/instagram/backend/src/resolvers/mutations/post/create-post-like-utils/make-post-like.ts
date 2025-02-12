import { PostLike } from '../../../../generated';
import { PostLikeModal } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { CreationError } from '../../../../utils/error';

type input = {
  userId: string;
  postId: string;
};
export const makePostLike = async ({ input }: { input: input }): Promise<PostLike> => {
  try {
    const { userId, postId } = input;
    const postLike = await PostLikeModal.create({
      userId,
      postId,
    });
    if (!postLike) {
      throw new CreationError('Постон дээр зүрх дарахад алдаа гарлаа');
    }
    return postLike;
  } catch (error) {
    throw catchError(error);
  }
};
