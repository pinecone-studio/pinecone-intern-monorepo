import { deleteQuiz } from '@/graphql/resolvers/mutations';
import { GraphQLError } from 'graphql';
import { QuizModel } from '@/model/quiz.model';

jest.mock('@/model/quiz.model', () => ({
  QuizModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('deleteQuiz resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a quiz successfully', async () => {
    const quizId = '662237cf4f5c3bd73c213f21';
    const deletedQuiz = {
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
    (QuizModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedQuiz);

    const result = await deleteQuiz(null, { quizId });

    expect(result).toEqual(deletedQuiz);
    expect(QuizModel.findByIdAndDelete).toHaveBeenCalledWith(quizId);
  });

  it('should throw a GraphQLError if quiz deletion fails', async () => {
    const quizId = '123';
    const error = new Error('Delete quiz error');
    (QuizModel.findByIdAndDelete as jest.Mock).mockRejectedValueOnce(error);

    await expect(deleteQuiz(null, { quizId })).rejects.toThrow(GraphQLError);
  });
});
