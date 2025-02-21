import { MutationResolvers } from '../../../generated';
import { Post } from '../../../models/post-model';

export const updatePostStatus: MutationResolvers['updatePostStatus'] = async (_, { _id, input }) => {
  const { status } = input;

  const updatedPost = await Post.findByIdAndUpdate(_id, { status }, { new: true });
  return updatedPost;
};
