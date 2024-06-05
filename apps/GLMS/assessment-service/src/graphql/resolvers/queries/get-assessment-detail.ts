import { GraphQLError } from 'graphql';
import AssessmentModel from '@/models/assessment.model';
import { QueryResolvers } from '@/graphql/generated';

export const getAssessmentDetails: QueryResolvers['getAssessmentDetails'] = async (_, { _id }) => {
  try {
    const assessment = await AssessmentModel.findById(_id);
    return assessment;
  } catch (error) {
    throw new GraphQLError('Could not find specific assessment');
  }
};
