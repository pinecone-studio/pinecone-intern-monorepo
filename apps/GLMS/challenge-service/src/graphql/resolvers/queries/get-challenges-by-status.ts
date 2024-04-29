import { QueryResolvers } from '@/graphql/generated';
import { ChallengeModel } from '@/model/challenge.model';
import { GraphQLError } from 'graphql';

export const getChallengesByStatus: QueryResolvers['getChallengesByStatus'] = async () => {
  try {
    const approvedChallenge = await ChallengeModel.find({ status: 'APPROVED' }).populate('quiz');
    return approvedChallenge;
  } catch (error) {
    throw new GraphQLError('Error in get challenges by approved status query');
  }
};
