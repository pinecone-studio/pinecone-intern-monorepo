import { MutationResolvers, Response } from '../../../generated';
import { postsModel } from '../../../models';

export const deletePost: MutationResolvers['deletePost'] = async (_, _id) => {
  const deletedPost = await postsModel.findByIdAndDelete(_id);
  if (!deletedPost) {
    throw new Error('Post not found');
  }
  return Response.Success;
};
