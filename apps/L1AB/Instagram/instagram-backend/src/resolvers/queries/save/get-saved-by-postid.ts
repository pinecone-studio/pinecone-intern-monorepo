import { QueryResolvers } from '../../../generated';
import { savedModel } from '../../../models';

export const getSavedByPostId: QueryResolvers['getSavedByPostId'] = async (_, { postId }) => {
  const savedPost = await savedModel.findOne({ postId: postId }).populate('postId').populate('userId');
  return savedPost || {};
};
