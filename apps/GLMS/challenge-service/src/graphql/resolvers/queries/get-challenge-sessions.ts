import { ChallengeSessionModel } from '@/model';
import { GraphQLError } from 'graphql';

export const getChallengeSessions = async () => {
  try {
    const challengeSessions = await ChallengeSessionModel.find();
    return challengeSessions;
  } catch (error) {
    throw new GraphQLError('Error in get challenge sessions query');
  }
};
