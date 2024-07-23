import { getQuizzes } from '@/graphql/resolvers/queries';
import { QuizModel } from '@/models/quiz-model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/quiz-model', () => ({
  QuizModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
      },
    ]),
  },
}));

describe('Get Quizzes', () => {
  it('should return all quizzes', async () => {
    const result = await getQuizzes!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([
      {
        _id: '1',
      },
    ]);
  });

  it('should handle errors when the database fails', async () => {
    const errorMessage = 'Database operation failed';

    (QuizModel.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getQuizzes!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});
