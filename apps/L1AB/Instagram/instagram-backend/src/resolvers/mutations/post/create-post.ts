import { MutationResolvers } from '../../../generated';
import { postsModel } from '../../../models';

export const createPost: MutationResolvers['createPost'] = async (_, { input }) => {
  const newPost = await postsModel.create(input);
  const populatedPost = await newPost.populate('userId');

  return populatedPost;
};
