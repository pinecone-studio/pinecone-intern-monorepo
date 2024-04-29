import { QueryResolvers } from '@/graphql/generated';
import { ChallengeModel } from '@/model/challenge.model';
import { GraphQLError } from 'graphql';

export const getChallengeById: QueryResolvers['getChallengeById'] = async (_, { challengeId }) => {
  try {
    const challenge = await ChallengeModel.findById(challengeId);
    return challenge;
  } catch (error) {
    throw new GraphQLError('Error in get challenge by id query');
  }
};
