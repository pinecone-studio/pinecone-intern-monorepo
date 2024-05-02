import { createQuiz } from '../../src/graphql/resolvers/mutations';
import { errorTypes, graphqlErrorHandler } from '../../src/graphql/resolvers/error';
import { GraphQLResolveInfo } from 'graphql';

const quizInput = {
  _id: '1',
  question: 'what is this ',
  choices: [
    {
      choice: 'apple',
      isCorrect: true,
    },
    {
      choice: 'mango',
      isCorrect: false,
    },
  ],
  choicesType: 'TEXT',
};

jest.mock('@/model/quiz.model', () => ({
  QuizModel: {
    create: jest.fn().mockResolvedValueOnce(quizInput).mockRejectedValueOnce(null),
  },
}));

describe('Create Quiz', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1.should create a quiz', async () => {
    const result = await createQuiz!({}, { quizInput: quizInput }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual('1');
  });

  it('2. should throw error if cannot create quiz', async () => {
    try {
      await createQuiz!({}, { quizInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'can not create a quiz' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
