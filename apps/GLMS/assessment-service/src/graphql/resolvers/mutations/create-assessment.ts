import { MutationResolvers } from '@/graphql/generated';
import AssessmentModel from '@/models/assessment.model';
import { GraphQLError } from 'graphql';

export const createAssessment: MutationResolvers['createAssessment'] = async (_, { createAssessmentInput }) => {
  try {
    const Assessment = await AssessmentModel.create(createAssessmentInput);

    return Assessment._id;
  } catch (error) {
    throw new GraphQLError('Could not create Assessment');
  }
};
