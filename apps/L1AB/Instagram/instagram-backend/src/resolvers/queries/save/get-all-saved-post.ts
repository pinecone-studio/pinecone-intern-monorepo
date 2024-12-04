import { QueryResolvers } from '../../../generated';
import { savedModel } from '../../../models';

export const getAllSavedPosts: QueryResolvers['getAllSavedPosts'] = async () => {
  const savedPosts = await savedModel.find({});

  if (!savedPosts.length) {
    throw new Error('There is no saved post');
  }
  return savedPosts;
};
