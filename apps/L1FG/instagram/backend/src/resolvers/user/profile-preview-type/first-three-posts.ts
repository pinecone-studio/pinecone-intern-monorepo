import { PostsEdge } from '../../../generated';
import { PostModel } from '../../../models';

export const firstThreePosts = async ({ searchingUserId }: { searchingUserId: string }): Promise<PostsEdge[]> => {
  const posts = await PostModel.find({ userId: searchingUserId }).sort({ _id: -1 }).limit(3);
  const edges = posts.map((post) => ({
    cursor: Buffer.from(post._id as string).toString('base64'),
    node: post,
  }));
  return edges;
};
