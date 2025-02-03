import { QueryResolvers } from '../../../generated';
import { PostModel } from '../../../models';

export const getPosts: QueryResolvers['getPosts'] = async (_, { searchingUserId }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const posts = await PostModel.find({ userId: searchingUserId });
  return posts;
};
