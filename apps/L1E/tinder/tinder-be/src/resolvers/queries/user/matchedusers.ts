import { QueryResolvers } from '../../../generated';
import { matchModel } from '../../../models/user/match.model';

export const getMatchedUsers: QueryResolvers['getMatchedUsers'] = async (_, { authId }) => {
  const matches = await matchModel.find({ userId: authId }).populate('userId targetUserId');
  return matches.map((item) => item.toObject());
};
