import { getAssessmentDetails } from '../../src/graphql/resolvers/queries/get-assessment-detail';
import AssessmentModel from '@/models/assessment.model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/assessment.model', () => ({
  findById: jest.fn(),
}));

describe('getAssessmentDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an assessment by ID', async () => {
    const id = '1';
    const mockAssessment = [
      {
        _id: '1',
        title: 'Glastonbury',
        content: 'html.J',
        position: 3,
        createdAt: '2024-05-27T08:08:10.590Z',
        updatedAt: '2024-05-27T08:08:10.590Z',
      },
    ];

    jest.spyOn(AssessmentModel, 'findById').mockResolvedValue(mockAssessment);

    const result = await getAssessmentDetails(null, { _id: id });
    expect(result).toEqual(mockAssessment);

    expect(AssessmentModel.findById).toHaveBeenCalledWith(id);
  });

  it('throws an error when an error occurs during findById', async () => {
    const id = '888';
    const errorMessage = 'Database error';
    jest.spyOn(AssessmentModel, 'findById').mockRejectedValue(new Error(errorMessage));

    await expect(getAssessmentDetails(null, { _id: id })).rejects.toThrow(GraphQLError);
    expect(AssessmentModel.findById).toHaveBeenCalledWith(id);
  });
});
