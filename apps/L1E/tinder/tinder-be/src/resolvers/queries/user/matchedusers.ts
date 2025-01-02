import { QueryResolvers } from '../../../generated';
import { matchModel } from '../../../models/user/match.model';

export const getMatchedUsers: QueryResolvers['getMatchedUsers'] = async (_, { authId }) => {
  try {
    if (!authId) {
      throw new Error('User is not authenticated');
    }

    const matches = await matchModel.find({ userId: authId });

    return matches.map((match) => ({
      ...match.toObject(),
      _id: match._id.toString(),
    }));
  } catch (error) {
    throw new Error('Failed to get matches for the logged-in user');
  }
};
