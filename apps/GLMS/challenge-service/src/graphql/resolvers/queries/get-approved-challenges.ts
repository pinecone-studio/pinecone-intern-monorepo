import { QueryResolvers } from '@/graphql/generated';
import { ChallengeModel } from '@/model';
import { GraphQLError } from 'graphql';

export const getApprovedChallenges: QueryResolvers['getApprovedChallenges'] = async () => {
  try {
    const approvedChallenge = await ChallengeModel.find({ status: 'APPROVED' }).populate('courseId').populate('quiz');
    return approvedChallenge;
  } catch (error) {
    throw new GraphQLError('Error in get challenges by approved status query');
  }
};
