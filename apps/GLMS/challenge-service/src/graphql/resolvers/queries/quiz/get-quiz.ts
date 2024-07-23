import { QueryResolvers } from '@/graphql/generated';
import { QuizModel } from '@/models/quiz-model';
import { GraphQLError } from 'graphql';

export const getQuiz: QueryResolvers['getQuiz'] = async (_: unknown, { id }: { id: string }) => {
  try {
    const getQuiz = await QuizModel.findById(id);

    if (!getQuiz) {
      throw new GraphQLError('Quiz not found');
    }

    return getQuiz;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get quiz: ${message}`);
  }
};
