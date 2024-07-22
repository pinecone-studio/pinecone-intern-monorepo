import { CreateQuestionInput } from '@/graphql/generated';
import { QuestionModel } from '@/models/question-model';
import { GraphQLError } from 'graphql';

export const createQuestion = async (_: unknown, { createInput }: { createInput: CreateQuestionInput }) => {
  try {
    const newQuestion = await QuestionModel.create({ ...createInput });
    return newQuestion;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to create option: ${message}`);
  }
};
