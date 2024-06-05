import { getAssessments } from '../../src/graphql/resolvers/queries/get-assessments';
import AssessmentModel from '@/models/assessment.model';

jest.mock('@/models/assessment.model', () => ({
  find: jest.fn(),
}));

describe('getAssessments', () => {
  it('should return all assessments from AssessmentModel', async () => {
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

    (AssessmentModel.find as jest.Mock).mockResolvedValue(mockAssessment);
    const result = await getAssessments();
    expect(result).toEqual(mockAssessment);

    expect(AssessmentModel.find).toHaveBeenCalledTimes(1);
  });
  it('Should handle error when AssessmentModel.find fails', async () => {
    (AssessmentModel.find as jest.Mock).mockRejectedValue(new Error('data base error'));

    await expect(getAssessments()).rejects.toThrow('Could not retrieve Assessments');

    expect(AssessmentModel.find).toHaveBeenCalledTimes(2);
  });
});
