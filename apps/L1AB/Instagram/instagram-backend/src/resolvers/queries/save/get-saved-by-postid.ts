import { QueryResolvers } from '../../../generated';
import { savedModel } from '../../../models';

export const getSavedByPostId: QueryResolvers['getSavedByPostId'] = async (_, { postId }) => {
  const savedPosts = await savedModel.findOne({ postId: postId }).populate('postId').populate('userId');
  console.log(savedPosts);

  if (!savedPosts) {
    throw new Error('No saved posts found for this user');
  }

  return savedPosts;
};
