import { createQuiz } from '@/graphql/resolvers/mutations';
import { QuizModel } from '@/models/quiz-model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/quiz-model', () => ({
  QuizModel: {
    create: jest.fn() as jest.Mock,
  },
}));

const input = {
  title: 'Test Quiz',
  description: 'This is a test quiz',
  courseId: 'string',
  questions: [
    {
      questionText: 'Sample question?',
      options: [
        { optionText: 'Option 1', isCorrect: false },
        { optionText: 'Option 2', isCorrect: true },
      ],
    },
  ],
};

describe('Create Quiz', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a quiz successfully', async () => {
    (QuizModel.create as jest.Mock).mockResolvedValue({
      _id: '1',
      ...input,
    });

    const result = await createQuiz({}, { createInput: input });

    expect(result).toEqual({
      _id: '1',
      ...input,
    });
    expect(QuizModel.create).toHaveBeenCalledTimes(1);
    expect(QuizModel.create).toHaveBeenCalledWith({ ...input });
  });

  it('should handle errors when database operation fails', async () => {
    const errorMessage = 'Database operation failed';

    (QuizModel.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(createQuiz({}, { createInput: input })).rejects.toThrow(new GraphQLError(`Failed to create option: ${errorMessage}`));

    expect(QuizModel.create).toHaveBeenCalledTimes(1);
    expect(QuizModel.create).toHaveBeenCalledWith({ ...input });
  });
});
