import { MutationResolvers } from '../../../generated';
import { likesModel, notificationsModel } from '../../../models';

export const createLike: MutationResolvers['createLike'] = async (_, { userId, postId }) => {
  const like = await likesModel.findOne({ postId: postId, userId: userId });

  if (like) {
    await likesModel.deleteOne({ postId: postId, userId: userId });
    return like;
  } else {
    const newLike = await likesModel.create({ userId, postId });
    const liked = await likesModel.findOne({ postId: postId, userId: userId }).populate('postId');

    if (liked) {
      const notifiedUserIdliked = liked.postId.userId;

      await notificationsModel.create({
        userId: userId,
        type: 'like',
        postId: postId,
        notifiedUserId: notifiedUserIdliked,
      });
    }
    return newLike;
  }
};
