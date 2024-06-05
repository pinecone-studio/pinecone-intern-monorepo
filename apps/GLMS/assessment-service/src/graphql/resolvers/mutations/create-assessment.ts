import { MutationResolvers } from '@/graphql/generated';
import AssessmentModel from '@/models/assessment.model';
import { GraphQLError } from 'graphql';

export const createAssessment: MutationResolvers['createAssessment'] = async (_, { createAssessmentInput }) => {
  try {
    const title = createAssessmentInput?.title;
    const content = createAssessmentInput?.content;
    const position = createAssessmentInput?.position;

    const Assessment = await AssessmentModel.create({
      title,
      content,
      position,
    });

    return Assessment;
  } catch (error) {
    throw new GraphQLError('Could not create Assessment');
  }
};
