import { getQuestions } from '@/graphql/resolvers/queries';
import { QuestionModel } from '@/models/question-model';

jest.mock('@/models/question-model', () => ({
  QuestionModel: {
    find: jest.fn().mockReturnThis(),
    populate: jest.fn().mockResolvedValue([
      {
        _id: '1',
        quizId: '1',
      },
    ]),
  },
}));

describe('getQuestions', () => {
  const quizId = '1';

  it('should return all questions for the given quizId', async () => {
    const result = await getQuestions({}, { quizId });

    expect(result).toEqual([
      {
        _id: '1',
        quizId: '1',
      },
    ]);
  });

  it('should handle errors when the database operation fails', async () => {
    const errorMessage = 'Database operation failed';
    (QuestionModel.find as jest.Mock).mockReturnThis();
    (QuestionModel.populate as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getQuestions({}, { quizId })).rejects.toThrow(`Failed to get questions: ${errorMessage}`);
  });
});
