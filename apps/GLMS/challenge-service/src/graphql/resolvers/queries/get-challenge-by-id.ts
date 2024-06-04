import { QueryResolvers } from '@/graphql/generated';
import { ChallengeModel } from '@/model/challenge.model';
import { GraphQLError } from 'graphql';

export const getChallengeById: QueryResolvers['getChallengeById'] = async (_, { courseId }) => {
  try {
    const challenge = await ChallengeModel.findOne({ courseId }).populate('quiz');
    return challenge;
  } catch (error) {
    throw new GraphQLError('Error in get challenge by id query');
  }
};
