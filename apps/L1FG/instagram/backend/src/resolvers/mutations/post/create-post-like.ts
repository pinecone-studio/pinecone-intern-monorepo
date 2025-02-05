import { MutationResolvers } from '../../../generated';
import { PostLikeModal } from '../../../models';

export const createPostLike: MutationResolvers['createPostLike'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { postId, ownerUserId } = input;
  console.log(ownerUserId);
  const postLike = await PostLikeModal.create({
    userId,
    postId,
  });
  return postLike;
};
