import { QuizModel } from '@/model/quiz.model';
import { MutationResolvers } from '@/graphql/generated';
import { GraphQLError } from 'graphql';

export const deleteQuiz: MutationResolvers[`deleteQuiz`] = async (_, { quizId }) => {
  try {
    const quiz = await QuizModel.findByIdAndDelete(quizId);
    return quiz;
  } catch (error) {
    throw new GraphQLError('can not delete a question');
  }
};
