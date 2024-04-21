import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { createChallenge } from '@/graphql/resolvers/mutations';
import { QuizModel } from '@/model/quiz.model';

import { ChallengeModel } from './../../src/model/challenge.model';
import { ChallengeInput, QuizInput } from '@/graphql/generated';

const quizInput = [
  {
    _id: '1',
    question: 'HTML yu ve',
    choices: [
      { choise: 'true', iscorrect: true },
      { choise: 'false', iscorrect: false },
    ],
  },
  {
    _id: '2',
    question: 'what is hwml',
    choices: [
      { choise: 'true', iscorrect: true },
      { choise: 'false', iscorrect: false },
    ],
  },
] as QuizInput;

const quizIds = ['1', '2'];
const challengeInput = {
  title: 'html',
  author: 'bagsh',
  xp: 0,
  refCourse: 'course',
  status: 'DRAFT',
} as ChallengeInput;

const challengeAndQuizInput = {
  title: 'html',
  author: 'bagsh',
  xp: 0,
  refCourse: 'course',
  status: 'DRAFT',
  quiz: ['1', '2'],
};

jest.mock('@/model/quiz.model', () => ({
  QuizModel: {
    insertMany: jest.fn().mockResolvedValueOnce(quizInput),
  },
}));

jest.mock('@/model/challenge.model', () => ({
  ChallengeModel: {
    create: jest.fn().mockResolvedValueOnce({ challengeInput, quiz: quizIds }),
  },
}));

describe('create challenge', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should create a challenge', async () => {
    const result = await createChallenge({ quizInput, challengeInput });
    expect(QuizModel.insertMany).toHaveBeenCalledWith(quizInput);
    expect(ChallengeModel.create).toHaveBeenCalledWith(challengeAndQuizInput);
    expect(result).toEqual({ challengeInput, quiz: quizIds });
  });

  it('should throw error if cannot create challenge', async () => {
    try {
      await createChallenge({ quizInput, challengeInput });
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'cannot create challenge' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
