import { QuizModel } from '../../../model/quiz.model';
import { errorTypes, graphqlErrorHandler } from '../error';
import { MutationResolvers } from '../../generated';

export const updateQuiz: MutationResolvers['updateQuiz'] = async (_, { quizId, updateQuiz }) => {
  try {
    const quiz = await QuizModel.findByIdAndUpdate(quizId, updateQuiz, { new: true });
    return quiz;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'can not update a quiz' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
