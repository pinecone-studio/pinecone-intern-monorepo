import { getQuestion } from '@/graphql/resolvers/queries';
import { QuestionModel } from '@/models/question-model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/question-model', () => ({
  QuestionModel: {
    findById: jest.fn().mockReturnThis(),
    populate: jest.fn(),
  },
}));

describe('getQuestion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a question when found', async () => {
    (QuestionModel.findById as jest.Mock).mockReturnThis();
    (QuestionModel.populate as jest.Mock).mockResolvedValue({
      _id: '1',
      quizId: {
        _id: '2',
        name: 'Sample Quiz',
      },
    });

    const result = await getQuestion({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      quizId: {
        _id: '2',
        name: 'Sample Quiz',
      },
    });
  });

  it('should throw an error when no question is found', async () => {
    (QuestionModel.findById as jest.Mock).mockReturnThis();
    (QuestionModel.populate as jest.Mock).mockResolvedValue(null);

    await expect(getQuestion({}, { _id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Question not found');
  });

  it('should handle errors when the database operation fails', async () => {
    const errorMessage = 'Database error';
    (QuestionModel.findById as jest.Mock).mockReturnThis();
    (QuestionModel.populate as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getQuestion({}, { _id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(`Failed to get question: ${errorMessage}`);
  });
});
