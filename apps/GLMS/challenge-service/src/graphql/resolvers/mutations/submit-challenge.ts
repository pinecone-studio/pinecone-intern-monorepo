import { ChallengeSessionModel } from '@/model/challenge-session.model';
import { errorTypes, graphqlErrorHandler } from '../error';
import { MutationResolvers } from '@/graphql/generated';

export const submitChallenge: MutationResolvers['submitChallenge'] = async (_, { challengeSessionInput }) => {
  try {
    const submitChallenge = await ChallengeSessionModel.create(challengeSessionInput);
    return submitChallenge._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'cannot submit challenge' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
