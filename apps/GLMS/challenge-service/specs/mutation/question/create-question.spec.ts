import { createQuestion } from '@/graphql/resolvers/mutations';
import { QuestionModel } from '@/models/question-model';
import { CreateQuestionInput } from '@/graphql/generated';

jest.mock('@/models/question-model', () => ({
  QuestionModel: {
    create: jest.fn() as jest.Mock,
  },
}));

const input: CreateQuestionInput = {
  quizId: '1',
  text: 'test1',
  options: [
    {
      optionText: 'test1',
      isCorrect: true,
    },
  ],
};

describe('Create Question', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a question successfully', async () => {
    (QuestionModel.create as jest.Mock).mockResolvedValue({
      quizId: '1',
      text: 'test1',
      options: [
        {
          optionText: 'test1',
          isCorrect: true,
        },
      ],
    });

    const result = await createQuestion({}, { createInput: input });

    expect(result).toEqual({
      quizId: '1',
      text: 'test1',
      options: [
        {
          optionText: 'test1',
          isCorrect: true,
        },
      ],
    });
    expect(QuestionModel.create).toHaveBeenCalledTimes(1);
    expect(QuestionModel.create).toHaveBeenCalledWith({ ...input });
  });

  it('should handle errors when database operation fails', async () => {
    const errorMessage = 'Database operation failed';

    (QuestionModel.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(createQuestion({}, { createInput: input })).rejects.toThrow(`Failed to create question: ${errorMessage}`);

    expect(QuestionModel.create).toHaveBeenCalledTimes(1);
    expect(QuestionModel.create).toHaveBeenCalledWith({ ...input });
  });
});
