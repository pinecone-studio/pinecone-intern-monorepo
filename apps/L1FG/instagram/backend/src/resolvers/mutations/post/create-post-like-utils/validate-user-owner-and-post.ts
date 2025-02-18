import { PostModel, UserModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';
import { NotFoundError, UserNotFoundError } from '../../../../utils/error';

type input = {
  userId: string;
  ownerUserId: string;
  postId: string;
};
// eslint-disable-next-line complexity
export const validateUserOwnerAndPost = async ({ input }: { input: input }) => {
  try {
    const { userId, ownerUserId, postId } = input;
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      throw new UserNotFoundError('хэрэглэгч олдсонгүй');
    }
    const foundOwner = await UserModel.findById(ownerUserId);
    if (!foundOwner) {
      throw new UserNotFoundError('постны эзэмшигч олдсонгүй');
    }
    const foundPost = await PostModel.findById(postId);
    if (!foundPost) {
      throw new NotFoundError('пост олдсонгүй');
    }
  } catch (error) {
    throw catchError(error);
  }
};
