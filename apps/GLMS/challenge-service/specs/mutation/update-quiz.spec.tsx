import { updateQuiz } from '../../src/graphql/resolvers/mutations/';
import { errorTypes, graphqlErrorHandler } from '../../src/graphql/resolvers/error';
import { GraphQLResolveInfo } from 'graphql';

const quizIdMockData = '662237cf4f5c3bd73c213f21';
const updateQuizMockData = {
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
    findByIdAndUpdate: jest.fn().mockResolvedValueOnce(updateQuizMockData).mockRejectedValueOnce(null),
  },
}));

describe('Update Quiz', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('1. should update a quiz', async () => {
    const result = await updateQuiz!({}, { quizIdMockData, updateQuizMockData }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(updateQuizMockData);
  });

  it('2. should throw error if cannot update quiz', async () => {
    try {
      await updateQuiz!({}, { quizIdMockData, updateQuizMockData }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'can not update a quiz' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});
