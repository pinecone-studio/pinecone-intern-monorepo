import { createAssessment } from '@/graphql/resolvers/mutations';
import AssessmentModel from '@/models/assessment.model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/assessment.model', () => ({
  create: jest.fn(),
}));

describe('createAssessment', () => {
  const mockAssessmentId = '12';
  const createInput = { name: 'Test Assessment', description: 'Test Description' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an assessment and return its ID', async () => {
    AssessmentModel.create.mockResolvedValue({ _id: mockAssessmentId });

    const result = await createAssessment({}, { createInput });

    expect(AssessmentModel.create).toHaveBeenCalledWith(createInput);
    expect(result).toBe(mockAssessmentId);
  });

  it('should throw a GraphQLError if assessment creation fails', async () => {
    AssessmentModel.create.mockRejectedValue(new Error('Creation failed'));

    await expect(createAssessment({}, { createInput })).rejects.toThrow(GraphQLError);
    await expect(createAssessment({}, { createInput })).rejects.toThrow('Could not create Assessment');
  });
});
