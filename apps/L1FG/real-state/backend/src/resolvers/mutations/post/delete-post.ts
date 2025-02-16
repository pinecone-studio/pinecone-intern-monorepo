import { MutationResolvers } from '../../../generated';
import { Post } from '../../../models/post-model';

export const deletePost: MutationResolvers['deletePost'] = async (_, { _id }) => {
  const deletedPost = await Post.findByIdAndDelete(_id);

  if (!deletedPost) {
    throw new Error('Post not found');
  }

  return deletedPost;
};
