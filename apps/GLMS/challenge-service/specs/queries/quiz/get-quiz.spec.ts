import { getQuiz } from '@/graphql/resolvers/queries';
import { QuizModel } from '@/models/quiz-model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/quiz-model', () => ({
  QuizModel: {
    findOne: jest.fn(),
  },
}));

describe('Get Quiz', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a quiz when found', async () => {
    (QuizModel.findOne as jest.Mock).mockResolvedValue({
      _id: '1',
      courseId: '2',
    });

    const result = await getQuiz!({}, { courseId: '2' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      courseId: '2',
    });
  });

  it('should throw an error when no quiz is found', async () => {
    (QuizModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(getQuiz!({}, { courseId: '2' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Quiz not found');
  });

  it('should handle errors when the database fails', async () => {
    const errorMessage = 'Database error';

    (QuizModel.findOne as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getQuiz!({}, { courseId: '2' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});
