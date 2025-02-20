import { MutationResolvers } from '../../../generated';
import { Post } from '../../../models/post-model';

export const updatePostStatus: MutationResolvers['updatePostStatus'] = async (_, { input, _id }) => {
  const { status } = input;
  console.log(status);

  const updatedPost = await Post.findByIdAndUpdate(_id, { status }, { new: true });
  return updatedPost;
};
