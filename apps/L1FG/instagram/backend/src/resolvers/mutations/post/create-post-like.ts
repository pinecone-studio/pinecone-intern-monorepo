import { MutationResolvers } from '../../../generated';
import { NotificationModel, PostLikeModal } from '../../../models';

export const createPostLike: MutationResolvers['createPostLike'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { postId, ownerUserId } = input;
  const postLike = await PostLikeModal.create({
    userId,
    postId,
  });

  await NotificationModel.create({
    userId: userId,
    ownerId: ownerUserId,
    contentPostId: postId,
    categoryType: 'POST_LIKE',
  });

  return postLike;
};
