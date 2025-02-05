import { QueryResolvers } from '../../../generated';
import { Post } from '../../../models/post-model';

export const getPostById: QueryResolvers['getPostById'] = async (_: unknown, { _id }) => {
  const post = await Post.findById(_id);
  console.log('post', post);

  if (!post) {
    throw new Error('There is no post with this ID');
  }

  return post;
};
