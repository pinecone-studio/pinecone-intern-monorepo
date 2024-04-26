import { ChallengeModel } from '@/model/challenge.model';
import { QuizModel } from '@/model/quiz.model';
import { errorTypes, graphqlErrorHandler } from '../error';
import { MutationResolvers } from './../../generated';

export const createChallenge: MutationResolvers[`createChallenge`] = async (_, { challengeInput, quizInput }) => {
  try {
    const quiz = await QuizModel.insertMany(quizInput);

    const quizIds = quiz.map((q) => q._id);
    const challenge = await ChallengeModel.create({ ...challengeInput, quiz: quizIds });
    return challenge._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'cannot create challenge' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
