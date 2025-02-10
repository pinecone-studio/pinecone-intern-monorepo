import { Post } from '../../../models/post-model';

import { QueryResolvers, Post as PostType } from '../../../generated';

export const getPosts: QueryResolvers['getPosts'] = async (_, input) => {
  const posts = await Post.find<PostType>(input).populate('propertyOwnerId');

  if (!posts) {
    throw new Error('There are no posts');
  }

  return posts;
};
