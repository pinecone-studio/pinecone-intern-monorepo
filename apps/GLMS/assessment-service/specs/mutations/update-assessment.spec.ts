import { updateAssessment } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/assessment.model', () => ({
  findByIdAndUpdate: jest
    .fn()
    .mockReturnValueOnce({
      _id: '1',
      title: 'Test Title',
      content: 'Test Content',
      position: 3,
      createdAt: '2323-23-23z23',
      updatedAt: '2323-23-23z23',
    })
    .mockReturnValueOnce(null),
}));

describe('Update Assessment', () => {
  it('Should update an Assessment', async () => {
    const result = await updateAssessment!({}, { _id: '1', updateAssessmentInput: { title: 'Test Title', content: 'Test Content', position: 3, updatedAt: '2323-23-23z23' } } as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      title: 'Test Title',
      content: 'Test Content',
      position: 3,
      createdAt: '2323-23-23z23',
      updatedAt: '2323-23-23z23',
    });
  });

  it("Should throw an error if the Assessment doesn't exist", async () => {
    try {
      await updateAssessment!({}, { _id: '12', updateAssessmentInput: { title: 'Test Title', content: 'Test Content', position: 3, updatedAt: '2323-23-23z23' } } as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not update Assessment'));
    }
  });

  it('Should throw error if update failed', async () => {
    try {
      await updateAssessment!({}, { _id: '1', updateAssessmentInput: { title: 'Test Title', content: 'Test Content', position: 3, updatedAt: '2323-23-23z23' } } as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not update Assessment'));
    }
  });
});
