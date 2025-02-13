/*eslint-disable*/
import { CommentLikeModel, UserModel } from '../../../../models';
import { CommentModel } from '../../../../models/comment.model';
import { catchError } from '../../../../utils/catch-error';
import { FoundError, NotFoundError } from '../../../../utils/error';
type input = {
  ownerUserId: string;
  commentId: string;
  userId: string | null;
};
export const validateCommentlikeCommentOwneruser = async ({ input }: { input: input }) => {
  try {
    const { ownerUserId, commentId, userId } = input;
    const foundCommentLikePromise = CommentLikeModel.findOne({
      userId: userId,
      commentId,
    });
    const foundCommentPromise = CommentModel.findById(commentId);
    const foundOwnerUserPromise = UserModel.findById(ownerUserId);
    const [foundCommentLike, foundComment, foundOwnerUser] = await Promise.all([foundCommentLikePromise, foundCommentPromise, foundOwnerUserPromise]);
    if (foundCommentLike) {
      throw new FoundError('коммент дээр зүрх дарсан байна');
    }
    if (!foundComment) {
      throw new NotFoundError('коммент байхгүй байна');
    }
    if (!foundOwnerUser) {
      throw new NotFoundError('постны эзэмшигч байхгүй байна');
    }
  } catch (error) {
    throw catchError(error);
  }
};
