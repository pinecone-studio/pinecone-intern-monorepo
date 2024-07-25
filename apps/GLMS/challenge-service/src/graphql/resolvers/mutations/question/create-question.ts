import { CreateQuestionInput } from '@/graphql/generated';
import { QuestionModel } from '@/models/question-model';
import { GraphQLError } from 'graphql';

export const createQuestion = async (_: unknown, { createInput }: { createInput: CreateQuestionInput }) => {
  try {
    const newQuestion = await QuestionModel.create({ ...createInput });

    const populatedQuestion = await QuestionModel.findById(newQuestion._id).populate({
      path: 'quizId',
      model: 'GLMS-Quizzes',
    })
    return populatedQuestion;
  } catch (error) {
    const message = (error as Error).message;
    throw new GraphQLError(`Failed to create question: ${message}`);
  }
};
