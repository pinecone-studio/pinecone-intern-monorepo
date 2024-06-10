import { deleteAssessment } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/assessment.model', () => ({
  findByIdAndDelete: jest.fn().mockReturnValueOnce({
    _id: '1',
    title: 'Test Title',
    content: 'Test Content',
    position: 3,
    createdAt: '2323-23-23z23',
    updatedAt: '2323-23-23z23',
  }),
}));

describe('Delete Assessment', () => {
  it('Should delete assessment', async () => {
    const result = await deleteAssessment!({} as string, { _id: '1' } as GraphQLResolveInfo);
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
      await deleteAssessment!({}, { _id: '1' } as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not delete Assessment'));
    }
  });

  it('Should throw an error if an error occurs during the deletion process', async () => {
    try {
      await deleteAssessment!({}, { _id: '' } as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not delete Assessment'));
    }
  });
});
