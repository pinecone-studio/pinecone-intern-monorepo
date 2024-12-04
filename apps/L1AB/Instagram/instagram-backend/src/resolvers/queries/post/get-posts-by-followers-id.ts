import { QueryResolvers } from '../../../generated';
import { followersModel, postsModel, PostsPopulatedType } from '../../../models';

export const getPostsByFollowersId: QueryResolvers['getPostsByFollowersId'] = async (_, { followeeId }) => {
  const followers = await followersModel.find({ followeeId: followeeId }).select('followerId -_id');
  const followerIds = followers.map((follower) => follower.followerId);

  const posts = await postsModel.find({ userId: followerIds }).populate<PostsPopulatedType>('userId');

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  return sortedPosts;
};
