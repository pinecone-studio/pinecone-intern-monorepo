import { MutationResolvers } from '@/graphql/generated';
import AssessmentModel from '@/models/assessment.model';
import { GraphQLError } from 'graphql';

export const updateAssessment: MutationResolvers['updateAssessment'] = async (_, { _id, updateAssessmentInput }) => {
  try {
    const title = updateAssessmentInput?.title;
    const content = updateAssessmentInput?.content;
    const position = updateAssessmentInput?.position;
    const updatedAt = updateAssessmentInput?.updatedAt;

    const Assessment = await AssessmentModel.findByIdAndUpdate(_id, {
      title,
      content,
      position,
      updatedAt,
    });

    if (!Assessment) {
      throw new GraphQLError('Could not find Assessment');
    }

    return Assessment;
  } catch (error) {
    throw new GraphQLError('Could not update Assessment');
  }
};
