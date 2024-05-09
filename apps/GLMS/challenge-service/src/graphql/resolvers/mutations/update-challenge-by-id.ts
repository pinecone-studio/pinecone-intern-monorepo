import { ChallengeModel } from '@/model/challenge.model';
import { MutationResolvers } from '../../generated';
import { GraphQLError } from 'graphql';

export const updateChallenge: MutationResolvers[`updateChallenge`] = async (_, { challengeId, updateChallengeInput }) => {
  try {
    const challenge = await ChallengeModel.findByIdAndUpdate(challengeId, updateChallengeInput, { new: true });
    return challenge;
  } catch (error) {
    throw new GraphQLError('Could not update challenge');
  }
};
