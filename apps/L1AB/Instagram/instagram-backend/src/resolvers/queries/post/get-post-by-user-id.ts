import { Posts, QueryResolvers } from '../../../generated';
import { postsModel } from '../../../models';

export const getPostByUserId: QueryResolvers['getPostByUserId'] = async (_, { userId }) => {
  const posts = await postsModel.find({ userId });
  if (!posts) {
    throw new Error('Post not found');
  }
  return posts as Posts[];
};
