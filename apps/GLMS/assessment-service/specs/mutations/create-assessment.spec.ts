import { createAssessment } from '@/graphql/resolvers/mutations';
import AssessmentModel from '@/models/assessment.model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/assessment.model', () => ({
  create: jest.fn(),
}));

describe('createAssessment resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates an assessment successfully', async () => {
    const createAssessmentInput = { title: 'Test Title', content: 'Test Content', position: 3 };

    const mockAssessment = { id: '12', ...createAssessmentInput };

    jest.spyOn(AssessmentModel, 'create').mockResolvedValue(mockAssessment);

    const result = await createAssessment(null, { createAssessmentInput });
    expect(result).toEqual(mockAssessment);
    expect(AssessmentModel.create).toHaveBeenCalledWith(createAssessmentInput);
  });

  it('throws an error when assessment creation fails', async () => {
    const createAssessmentInput = { title: 'Test Title', content: 'Test Content', position: 3 };
    const errorMessage = 'Database error';

    jest.spyOn(AssessmentModel, 'create').mockRejectedValue(new Error(errorMessage));

    await expect(createAssessment(null, { createAssessmentInput })).rejects.toThrow(GraphQLError);
    expect(AssessmentModel.create).toHaveBeenCalledWith(createAssessmentInput);
  });
});
