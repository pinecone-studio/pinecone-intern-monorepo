import { CreateQuizInput } from '@/graphql/generated';
import { QuizModel } from '@/models/quiz-model';
import { GraphQLError } from 'graphql';

export const createQuiz = async (_: unknown, { createInput }: { createInput: CreateQuizInput }) => {
  try {
    const newQuiz = await QuizModel.create({ ...createInput });
    return newQuiz;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to create option: ${message}`);
  }
};
