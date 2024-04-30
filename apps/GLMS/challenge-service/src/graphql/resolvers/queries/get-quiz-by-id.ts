import { QueryResolvers } from '@/graphql/generated';
import { QuizModel } from '@/model/quiz.model';
import { GraphQLError } from 'graphql';

export const getQuizById: QueryResolvers['getQuizById'] = async (_, { quizId }) => {
  try {
    console.log('quizid', quizId);
    const quiz = await QuizModel.findById(quizId);
    return quiz;
  } catch (error) {
    throw new GraphQLError('Error in get quiz by id');
  }
};
