import { getQuiz } from '@/graphql/resolvers/queries';
import { QuizModel } from '@/models/quiz-model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/quiz-model', () => ({
  QuizModel: {
    findById: jest.fn(),
  },
}));

describe('Get Quiz', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a quiz when found', async () => {
    (QuizModel.findById as jest.Mock).mockResolvedValue({
      _id: '1',
      courseId: '2',
    });

    const result = await getQuiz!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      courseId: '2',
    });
  });

  it('should throw an error when no quiz is found', async () => {
    (QuizModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getQuiz!({}, { id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Quiz not found');
  });

  it('should handle errors when the database fails', async () => {
    const errorMessage = 'Database error';

    (QuizModel.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getQuiz!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});
