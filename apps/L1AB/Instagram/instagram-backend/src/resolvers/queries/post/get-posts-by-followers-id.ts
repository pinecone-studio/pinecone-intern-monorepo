import { QueryResolvers } from '../../../generated';
import { followersModel, postsModel, PostsPopulatedType } from '../../../models';

export const getPostsByFollowersId: QueryResolvers['getPostsByFollowersId'] = async (_, { followerId }) => {
  const followees = await followersModel.find({ followerId: followerId }).select('followeeId -_id');

  const followeeIds = followees.map((followee) => followee.followeeId);

  const posts = await postsModel.find({ userId: followeeIds }).populate<PostsPopulatedType>('userId');

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  return sortedPosts;
};
