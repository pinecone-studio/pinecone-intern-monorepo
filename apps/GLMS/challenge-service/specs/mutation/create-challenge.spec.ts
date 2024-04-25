import { ChallengeInput, QuizInput } from '@/graphql/generated';
import { createChallenge } from '../../src/graphql/resolvers/mutations/';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { GraphQLResolveInfo } from 'graphql';
export const quizInput = [
  {
    _id: '1',
    question: 'HTML yu ve',
    choices: [
      { choise: 'true', iscorrect: true },
      { choise: 'false', iscorrect: false },
    ],
    choisesType: 'TEXT',
  },
  {
    _id: '2',
    question: 'what is hwml',
    choices: [
      { choice: 'true', iscorrect: true },
      { choice: 'false', iscorrect: false },
    ],
    choisesType: 'TEXT',
  },
] as QuizInput;

export const challengeInput = {
  _id: 'testId',
  title: 'html',
  author: 'bagsh',
  xp: 0,
  refCourse: 'course',
  status: 'DRAFT',
} as ChallengeInput;

jest.mock('@/model/quiz.model', () => ({
  QuizModel: {
    insertMany: jest.fn().mockResolvedValueOnce(quizInput),
  },
}));

jest.mock('@/model/challenge.model', () => ({
  ChallengeModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        _id: 'testId',
      })
      .mockRejectedValueOnce(null),
  },
}));

describe('create challenge', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('1. should create a challenge', async () => {
    const result = await createChallenge!({}, { quizInput, challengeInput }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual('testId');
  });

  it('2. should throw error if cannot create challenge', async () => {
    try {
      await createChallenge!({}, { quizInput, challengeInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'cannot create challenge' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
