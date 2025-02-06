import { MutationResolvers } from '../../../generated';
import { PostLikeModal } from '../../../models';

export const deletePostLike: MutationResolvers['deletePostLike'] = async (_, { postId }, { userId }) => {
  const likedPost = await PostLikeModal.findOneAndDelete({ postId }, { userId });
  return likedPost;
};
