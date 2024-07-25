import { createQuestion } from '@/graphql/resolvers/mutations';
import { QuestionModel } from '@/models/question-model';
import { CreateQuestionInput } from '@/graphql/generated';

jest.mock('@/models/question-model', () => ({
  QuestionModel: {
    create: jest.fn(),
    findById: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn(),
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
      _id: '1',
      ...input
    });

    (QuestionModel.findById as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        _id: '1',
        ...input,
        quizId: {
          _id: '1',
          courseId: '1'
        }
      })
    });

    const result = await createQuestion({}, { createInput: input });

    expect(result).toEqual({
      _id: '1',
      ...input,
      quizId: {
        _id: '1',
        courseId: '1'
      }
    });

    expect(QuestionModel.create).toHaveBeenCalledTimes(1);
    expect(QuestionModel.create).toHaveBeenCalledWith({ ...input });
    expect(QuestionModel.findById).toHaveBeenCalledWith('1');
    expect(QuestionModel.findById('1').populate).toHaveBeenCalledWith({
      path: 'quizId',
      model: 'GLMS-Quizzes',
    });
  });

  it('should handle errors when database operation fails', async () => {
    const errorMessage = 'Database operation failed';

    (QuestionModel.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(createQuestion({}, { createInput: input })).rejects.toThrow(`Failed to create question: ${errorMessage}`);

    expect(QuestionModel.create).toHaveBeenCalledTimes(1);
    expect(QuestionModel.create).toHaveBeenCalledWith({ ...input });
  });
});

