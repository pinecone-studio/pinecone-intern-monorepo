import { QueryResolvers } from '../../../generated';
import { followersModel, postsModel, PostsPopulatedType } from '../../../models';

export const getPostsByFollowersId: QueryResolvers['getPostsByFollowersId'] = async (_, { followerId }) => {
  const myPosts = await postsModel.find({ userId: followerId }).populate<PostsPopulatedType>('userId');
  const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
  const myFilteredPosts = myPosts.filter((post) => new Date(post.createdAt) > thirtyMinsAgo);

  const mySortedPost = myFilteredPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const followees = await followersModel.find({ followerId: followerId }).select('followeeId -_id');
  const followeeIds = followees.map((followee) => followee.followeeId);
  const posts = await postsModel.find({ userId: followeeIds }).populate<PostsPopulatedType>('userId');

  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  const allPosts = [...mySortedPost, ...sortedPosts];

  return allPosts;
};
