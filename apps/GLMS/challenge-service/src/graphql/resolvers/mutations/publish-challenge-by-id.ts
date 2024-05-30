import { ChallengeModel } from '@/model';
import { MutationResolvers } from '../../generated';
import { GraphQLError } from 'graphql';

export const publishChallengeById: MutationResolvers[`publishChallengeById`] = async (_, { challengeId }) => {
  try {
    const challenge = await ChallengeModel.findOneAndUpdate({ _id: challengeId }, { status: 'APPROVED' });
    return challenge._id;
  } catch (error) {
    throw new GraphQLError('Could not publish challenge');
  }
};
