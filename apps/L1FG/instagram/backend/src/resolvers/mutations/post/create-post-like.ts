import { MutationResolvers } from '../../../generated';
import { PostLikeModal } from '../../../models';

export const createPostLike: MutationResolvers['createPostLike'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { postId, ownerUserId } = input;
  const postLike = await PostLikeModal.create({
    userId,
    postId,
    ownerUserId,
    hasLiked: true,
  });
  return postLike;
};
