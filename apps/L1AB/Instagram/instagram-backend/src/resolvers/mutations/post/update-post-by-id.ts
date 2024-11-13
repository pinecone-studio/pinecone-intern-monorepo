import { MutationResolvers } from '../../../generated';
import { postsModel } from '../../../models';

export const updatePostById: MutationResolvers['updatePostById'] = async (_, { postId, input }) => {
  const updatedPost = await postsModel.findByIdAndUpdate(postId, input, { new: true });
  console.log(updatedPost);

  if (!updatedPost) {
    throw new Error('Post not found');
  }
  return updatedPost;
};
