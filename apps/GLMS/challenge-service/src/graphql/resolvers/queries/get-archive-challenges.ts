import { QueryResolvers } from '@/graphql/generated';
import { ChallengeModel } from '@/model';
import { GraphQLError } from 'graphql';

export const getArchiveChallenges: QueryResolvers['getArchiveChallenges'] = async () => {
  try {
    const archivedChallenges = await ChallengeModel.find({ status: 'ARCHIVE' }).populate('quiz').populate('courseId');
    return archivedChallenges;
  } catch (error) {
    throw new GraphQLError('Error in get challenges by archive status query');
  }
};
