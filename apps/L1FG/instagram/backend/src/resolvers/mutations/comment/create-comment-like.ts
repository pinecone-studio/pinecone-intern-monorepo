import { MutationResolvers } from '../../../generated';
import { authenticate } from '../../../utils/authenticate';
import { createCommentlikeAndUpdateComment } from './create-comment-like-utils/create-commentlike-and-update-comment';
import { makeCommentLikeNotification } from './create-comment-like-utils/make-comment-like-notification';
import { validateCommentlikeCommentOwneruser } from './create-comment-like-utils/validate-commentlike-comment-owneruser';

export const createCommentLike: MutationResolvers['createCommentLike'] = async (_, { input }, { userId }) => {
  authenticate(userId);
  const { commentId, postId, ownerUserId } = input;
  await validateCommentlikeCommentOwneruser({
    input: {
      ownerUserId,
      userId,
      commentId,
    },
  });
  const commentLike = await createCommentlikeAndUpdateComment({
    input: {
      userId,
      commentId,
    },
  });
  await makeCommentLikeNotification({
    commentLike: commentLike,
    input: {
      commentId,
      userId,
      postId,
      ownerUserId,
    },
  });
  return commentLike;
};
