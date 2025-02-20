import { MutationResolvers } from '../../../generated';
import { Post } from '../../../models/post-model';

export const updatePostStatus: MutationResolvers['updatePostStatus'] = async (_, { input, _id }) => {
  const { status } = input;
  console.log(status);

  const updatedPost = await Post.findByIdAndUpdate(_id, { status }, { new: true });
  return updatedPost;
};


export const updatePost: MutationResolvers['updatePost'] = async (_, { _id, input }) => {
  const post = await Post.findByIdAndUpdate(_id, input, { new: true });

  return post;
};
