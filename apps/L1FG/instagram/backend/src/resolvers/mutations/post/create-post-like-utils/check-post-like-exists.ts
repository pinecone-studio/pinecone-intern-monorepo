import { PostLikeModal } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { FoundError } from '../../../../utils/error';

type InputType = {
  postId: string;
  userId: string;
};
export const checkPostLikeExists = async ({ input }: { input: InputType }) => {
  try {
    const { postId, userId } = input;
    const foundPostLike = await PostLikeModal.findOne({ userId, postId });
    if (foundPostLike) {
      throw new FoundError('Постон дээр зүрх дарсан байна');
    }
  } catch (error) {
    throw catchError(error);
  }
};
