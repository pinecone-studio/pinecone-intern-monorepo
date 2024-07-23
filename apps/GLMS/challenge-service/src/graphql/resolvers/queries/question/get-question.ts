import { QueryResolvers } from '@/graphql/generated';
import { QuestionModel } from '@/models/question-model';
import { GraphQLError } from 'graphql';

export const getQuestion: QueryResolvers['getQuestion'] = async (_: unknown, { _id }: { _id: string }) => {
  try {
    const question = await QuestionModel.findById(_id).populate({
      path: 'quizId',
      model: 'GLMS-Quiz',
    });

    if (!question) {
      throw new GraphQLError('Question not found');
    }

    return question;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get question: ${message}`);
  }
};
