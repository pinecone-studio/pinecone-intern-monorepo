import { QueryResolvers } from '../../../generated';
import { matchModel } from '../../../models/user/match.model';

export const getMatchedUserById: QueryResolvers['getMatchedUserById'] = async (_, { _id }) => {
  try {
    const match = await matchModel.findById({ _id });

    if (!match) {
      throw new Error(`User with ID ${_id} not found`);
    }

    return {
      ...match.toObject(),
      _id: match._id.toString(),
    };
  } catch (error) {
    throw new Error('Failed to fetch user data. Please try again.');
  }
};
