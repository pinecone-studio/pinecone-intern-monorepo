import { FollowerModel } from '../../models';

export const followingCount = async ({ _id }: { _id: string }) => {
  const followers = await FollowerModel.find({ followerId: _id });
  const count = followers.length;
  return count;
};
