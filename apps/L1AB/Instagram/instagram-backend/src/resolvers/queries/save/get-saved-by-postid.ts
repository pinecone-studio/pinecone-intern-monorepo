import { QueryResolvers } from '../../../generated';
import { savedModel } from '../../../models';

export const getSavedByPostId: QueryResolvers['getSavedByPostId'] = async (_, { postId }) => {
  const savedPosts = await savedModel.findOne({ postId: postId }).populate('postId').populate('userId');

  if (!savedPosts) {
    throw new Error('No saved posts found for this user');
  }
  console.log(savedPosts);

  return savedPosts;
};
