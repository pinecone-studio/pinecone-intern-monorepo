import { PostLike } from '../../../../generated';
import { PostLikeModal, PostModel } from '../../../../models';
import { catchError } from '../../../../utils/catch-error';

type input = {
  postId: string;
};
export const updatePostLike = async ({ input, postLike }: { input: input; postLike: PostLike }) => {
  try {
    const { postId } = input;
    await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } }, { new: true });
  } catch (error) {
    await PostLikeModal.findByIdAndDelete(postLike._id);
    throw catchError(error);
  }
};
