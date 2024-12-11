import { QueryResolvers } from '../../../generated';

import { PostsType, savedModel, UserType } from '../../../models';

export const getAllSavedPosts: QueryResolvers['getAllSavedPosts'] = async (_, { userId }) => {
  const savedPosts = await savedModel.find({ userId: userId }).populate<{ postId: PostsType }>('postId').populate<{ userId: UserType }>('userId');

  if (!savedPosts.length) throw new Error('There is no saved post found');

  return savedPosts.map((post) => ({
    _id: post._id,
    createdAt: post.createdAt,
    userId: post.userId,
    postId: post.postId,
  }));
};
