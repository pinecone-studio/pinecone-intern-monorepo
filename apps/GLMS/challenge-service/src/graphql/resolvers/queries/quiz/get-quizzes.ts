import { QueryResolvers } from '@/graphql/generated';
import { QuizModel } from '@/models/quiz-model';
import { GraphQLError } from 'graphql';

export const getQuizzes: QueryResolvers['getQuizzes'] = async () => {
  try {
    const getQuizzes = await QuizModel.find({});
    return getQuizzes;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to get quizzes ${message}`);
  }
};
