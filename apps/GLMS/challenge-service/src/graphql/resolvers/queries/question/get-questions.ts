import { QuestionModel } from '@/models/question-model';
import { GraphQLError } from 'graphql';

export const getQuestions = async (_: unknown, { quizId }: { quizId: string }) => {
  try {
    const getQuestions = await QuestionModel.find({ quizId }).populate('quizId');
    return getQuestions;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get questions: ${message}`);
  }
};
