import { QueryResolvers } from '@/graphql/generated';
import { ChallengeModel } from '@/model';
import { GraphQLError } from 'graphql';

export const getApprovedChallenges: QueryResolvers['getApprovedChallenges'] = async () => {
  try {
    const approvedChallenges = await ChallengeModel.find({ status: 'APPROVED' }).populate('courseId').populate('quiz');
    return approvedChallenges;
  } catch (error) {
    throw new GraphQLError('Error in get challenges by approved status query');
  }
};
