import { QueryResolvers } from '../../../generated';
import { likesModel } from '../../../models';

export const getLikesByPostId: QueryResolvers['getLikesByPostId'] = async (_, { postId }) => {
  const likes = await likesModel.find({ postId: postId });
  return likes;
};
