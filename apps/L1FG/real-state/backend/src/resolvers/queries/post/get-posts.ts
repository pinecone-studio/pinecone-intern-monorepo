import { Post } from '../../../models/post-model';
<<<<<<< HEAD
import { Post as PostType, QueryResolvers } from '../../../generated';

export const getPosts: QueryResolvers['getPosts'] = async (_, input) => {
  const posts = await Post.find<PostType>(input).populate('propertyOwnerId');
=======
import { QueryResolvers, Post as PostType } from '../../../generated';

export const getPosts: QueryResolvers['getPosts'] = async (_, { input }) => {
  const posts = await Post.find<PostType>(input);
  console.log('post', posts);
>>>>>>> 42b14c2d4 (feat: sadfasdf)

  if (!posts) {
    throw new Error('There are no posts');
  }

  return posts;
};
