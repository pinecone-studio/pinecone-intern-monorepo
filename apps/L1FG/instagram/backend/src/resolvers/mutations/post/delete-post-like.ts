import { MutationResolvers } from '../../../generated';
import { PostLikeModal, PostModel } from '../../../models';

export const deletePostLike: MutationResolvers['deletePostLike'] = async (_, { postId }, { userId }) => {
  const likedPost = await PostLikeModal.findOneAndDelete({ postId }, { userId });
  await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } }, { new: true });
  return likedPost;
};
