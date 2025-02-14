import { MutationResolvers } from '../../../generated';
import { Post } from '../../../models/post-model';

export const updatePost: MutationResolvers['updatePost'] = async (_, { _id, input }) => {
  const post = await Post.findByIdAndUpdate(_id, input, { new: true });

  return post;
};
