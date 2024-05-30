import { MutationResolvers } from '@/graphql/generated';
import { ChallengeModel } from '@/model';
import { GraphQLError } from 'graphql';

export const archiveChallengeById: MutationResolvers['archiveChallengeById'] = async (_, { challengeId }) => {
  try {
    const challenge = await ChallengeModel.findByIdAndUpdate(challengeId, { status: 'ARCHIVE' }, { new: true });
    return challenge._id;
  } catch (error) {
    throw new GraphQLError('Error in archive challenge by id query');
  }
};
