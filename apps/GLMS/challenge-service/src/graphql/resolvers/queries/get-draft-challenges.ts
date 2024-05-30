import { QueryResolvers } from '@/graphql/generated';
import { ChallengeModel } from '@/model';
import { GraphQLError } from 'graphql';

export const getDraftChallenges: QueryResolvers['getDraftChallenges'] = async () => {
  try {
    const draftChallenges = await ChallengeModel.find({ status: 'DRAFT' }).populate('quiz').populate('courseId');
    return draftChallenges;
  } catch (error) {
    throw new GraphQLError('Error in get challenges by DRAFT status query');
  }
};
