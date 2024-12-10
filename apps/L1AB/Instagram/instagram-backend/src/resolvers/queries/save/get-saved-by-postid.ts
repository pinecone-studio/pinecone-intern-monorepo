import { QueryResolvers } from '../../../generated';
import { savedModel } from '../../../models';

export const getSavedByPostId: QueryResolvers['getSavedByPostId'] = async (_, { postId }) => {
  const savedPosts = await savedModel.findOne({ postId: postId }).populate('postId').populate('userId');
  return savedPosts || {};
};
