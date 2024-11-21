import { QueryResolvers } from '../../../generated';
import { postsModel, PostsPopulatedType } from '../../../models';

export const getAllPosts: QueryResolvers['getAllPosts'] = async () => {
  const posts = await postsModel.find().populate<PostsPopulatedType>('userId');

  return posts;
};
