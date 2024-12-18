import { followersModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getSuggestedUsers: QueryResolvers['getSuggestedUsers'] = async (_, { _id }) => {
  const miniiDagadagshu = await followersModel.find({ followerId: _id });
  const miniiDagadag = miniiDagadagshu.map((item) => item.followeeId);
  const followersofFollowers = await followersModel
    .find({ followerId: { $in: miniiDagadag }, followeeId: { $nin: [...miniiDagadag, _id] } })
    .populate('followeeId')
    .populate('followerId');

  return followersofFollowers.map((el) => el.toObject());
};
