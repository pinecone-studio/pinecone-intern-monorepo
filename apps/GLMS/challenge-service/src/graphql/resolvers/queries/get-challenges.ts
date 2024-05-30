import { ChallengeModel } from '@/model';
import { GraphQLError } from 'graphql';

export const getChallenges = async () => {
  try {
    const challenges = await ChallengeModel.find().populate('quiz');
    return challenges;
  } catch (error) {
    throw new GraphQLError('Error in get challenges query');
  }
};
