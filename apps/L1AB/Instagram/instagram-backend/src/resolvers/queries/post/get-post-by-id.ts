import { QueryResolvers } from '../../../generated';
import { postsModel } from '../../../models';

export const getPostById: QueryResolvers['getPostById'] = async (_, { postId }) => {
  const post = await postsModel.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};
