import { ChallengeModel } from '@/model';
import { MutationResolvers } from '../../generated';
import { GraphQLError } from 'graphql';

export const deleteChallengeById: MutationResolvers[`deleteChallengeById`] = async (_, { challengeId }) => {
  try {
    const challenge = await ChallengeModel.findByIdAndDelete(challengeId);
    return challenge._id;
  } catch (error) {
    throw new GraphQLError('Could not delete challenge');
  }
};
