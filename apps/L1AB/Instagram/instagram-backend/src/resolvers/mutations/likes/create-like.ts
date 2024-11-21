import { MutationResolvers } from '../../../generated';
import { likesModel } from '../../../models';

export const createLike: MutationResolvers['createLike'] = async (_, { userId, postId }) => {
  const like = await likesModel.findOne({ postId: postId, userId: userId });
  console.log('dasdada', like);

  if (like) {
    await likesModel.deleteOne({ postId: postId, userId: userId });
    return like;
  } else {
    const newLike = await likesModel.create({ userId, postId });
    return newLike;
  }
};
