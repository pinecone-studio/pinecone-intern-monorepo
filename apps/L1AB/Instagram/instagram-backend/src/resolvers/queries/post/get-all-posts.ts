import { QueryResolvers } from '../../../generated';
import { postsModel } from '../../../models';

export const getAllPosts: QueryResolvers['getAllPosts'] = async () => {
  const posts = await postsModel.find();
  return posts;
};
