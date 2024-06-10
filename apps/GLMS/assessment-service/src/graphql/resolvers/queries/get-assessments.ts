import { GraphQLError } from 'graphql';
import AssessmentModel from '@/models/assessment.model';

export const getAssessments = async () => {
  try {
    const assessments = await AssessmentModel.find();
    return assessments;
  } catch (error) {
    throw new GraphQLError('Could not retrieve Assessments');
  }
};
