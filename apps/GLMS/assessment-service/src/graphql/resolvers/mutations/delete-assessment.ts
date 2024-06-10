import { MutationResolvers } from '@/graphql/generated';
import AssessmentModel from '@/models/assessment.model';
import { GraphQLError } from 'graphql';

export const deleteAssessment: MutationResolvers['deleteAssessment'] = async (_, { _id }) => {
  try {
    const id = _id;
    const assessment = await AssessmentModel.findByIdAndDelete(id);
    if (!assessment) {
      throw new GraphQLError('Could not delete Assessment');
    }
    return assessment;
  } catch (error) {
    throw new GraphQLError('Could not delete Assessment');
  }
};
