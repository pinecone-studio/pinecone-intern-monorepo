import { QueryResolvers } from '../../../generated';
import { PostLikeModal } from '../../../models';

export const getlikePost: QueryResolvers['getlikePost'] = async (_, { postId }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');

  const postLikes = await PostLikeModal.find({ postId });

  return postLikes;
};
