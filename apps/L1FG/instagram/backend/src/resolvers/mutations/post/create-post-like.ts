import { MutationResolvers } from '../../../generated';
import { checkPostLikeExists } from './create-post-like-utils/check-post-like-exists';
import { makePostLike } from './create-post-like-utils/make-post-like';
import { makePostLikeNotification } from './create-post-like-utils/make-post-like-notification';
import { updatePostLike } from './create-post-like-utils/update-post-like';
import { validateUserOwnerAndPost } from './create-post-like-utils/validate-user-owner-and-post';

export const createPostLike: MutationResolvers['createPostLike'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Та нэвтэрнэ үү');
  const { postId, ownerUserId } = input;
  await checkPostLikeExists({ input: { postId, userId } });
  await validateUserOwnerAndPost({ input: { postId, userId, ownerUserId } });
  const postLike = await makePostLike({
    input: {
      userId,
      postId,
    },
  });
  await updatePostLike({ input: { postId }, postLike: postLike });
  const notificationId = await makePostLikeNotification({ input: { postId, userId, ownerUserId }, postLike: postLike });
  return {
    ...postLike,
    notificationId,
  };
};
