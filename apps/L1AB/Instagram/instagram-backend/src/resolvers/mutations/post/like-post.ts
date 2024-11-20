import { MutationResolvers } from '../../../generated';
import { postsModel } from '../../../models';

export const likePost: MutationResolvers['likePost'] = async (_, { userId, postId }) => {
  const post = await postsModel.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }
  const alreadyLiked = post.likedUsers.includes(userId);

  let updatedPost;

  if (alreadyLiked) {
    updatedPost = await postsModel.findByIdAndUpdate(
      postId,
      {
        $pull: { likedUsers: userId },
        $inc: { likeCounts: -1 },
      },
      { new: true }
    );
  } else {
    updatedPost = await postsModel.findByIdAndUpdate(
      postId,
      {
        $addToSet: { likedUsers: userId },
        $inc: { likeCounts: 1 },
      },
      { new: true }
    );
  }

  return updatedPost;
};
