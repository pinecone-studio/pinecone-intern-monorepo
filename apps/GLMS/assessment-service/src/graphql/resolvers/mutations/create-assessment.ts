import { MutationResolvers } from '@/graphql/generated';
import AssessmentModel from '@/models/assessment.model';
import { GraphQLError } from 'graphql';

export const createAssessment: MutationResolvers['createAssessment'] = async (_, { createInput }) => {
  try {
    const assessment = await AssessmentModel.create(createInput);
    return assessment._id;
  } catch (error) {
    throw new GraphQLError('Could not create Assessment');
  }
};
