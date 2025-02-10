import { MutationResolvers } from '../../../generated';
import { authenticate } from '../../../utils/authenticate';
import { addPostToDatabase, updatePostCreator, validatePost } from './create-post-utils';

export const createPost: MutationResolvers['createPost'] = async (_, { input }, { userId }) => {
  authenticate(userId);
  const postCreator = await validatePost(userId, input);
  const newPost = await addPostToDatabase(userId, input);
  await updatePostCreator(userId, newPost, postCreator);
  return newPost;
};
