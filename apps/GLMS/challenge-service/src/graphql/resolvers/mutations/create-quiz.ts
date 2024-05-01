import { QuizModel } from '../../../model/quiz.model';
import { errorTypes, graphqlErrorHandler } from '../error';
import { MutationResolvers } from '../../generated';

export const createQuiz: MutationResolvers['createQuiz'] = async (_, { quizInput }) => {
  try {
    const quiz = await QuizModel.create(quizInput);
    return quiz._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'can not create a quiz' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
