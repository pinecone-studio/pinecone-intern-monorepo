import { getQuizById } from '../../src/graphql/resolvers/queries';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

const quizId = {
  _id: '1',
};

const quiz = {
  _id: 1,
  question: 'D',
  choicesType: 'TEXT',
  choices: [
    {
      isCorrect: true,
      choice: 'D',
    },
  ],
};

jest.mock('@/model/quiz.model', () => ({
  QuizModel: {
    findById: jest.fn().mockResolvedValueOnce(quiz).mockRejectedValueOnce(null),
  },
}));

describe('Get Quiz By id', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1.should get a quiz by id', async () => {
    const result = await getQuizById!({}, { quizId }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(quiz);
  });

  it('2. should throw error if cannot get quiz by id', async () => {
    try {
      await getQuizById!({}, { quizId }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Error in get quiz by id'));
    }
  });
});
