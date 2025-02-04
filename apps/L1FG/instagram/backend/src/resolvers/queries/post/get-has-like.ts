import { QueryResolvers } from '../../../generated';
import { PostLikeModal } from '../../../models';

export const getLikedPost: QueryResolvers['getLikedPost'] = async (_, __, { userId }) => {
  const liked = await PostLikeModal.findOne({ userId });

  return liked ? liked : { hasLiked: false };
};
