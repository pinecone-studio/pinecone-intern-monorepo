import { deleteCourse } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/model/course-model', () => ({
  findByIdAndDelete: jest.fn().mockReturnValueOnce({
    id: '1',
    title: 'html',
    description: 'html-intro',
    thumbnai: 'image.jpeg',
    position: 1,
  }),
}));

describe('Delete course', () => {
  it('should delete  course', async () => {
    const result = await deleteCourse!({} as string, { id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      id: '1',
      title: 'html',
      description: 'html-intro',
      thumbnai: 'image.jpeg',
      position: 1,
    });
  });

  it("should throw an error if the lesson doesn't exist", async () => {
    try {
      await deleteCourse!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Delete course failed'));
    }
  });
  it('should throw an error if an error occurs during delete course', async () => {
    try {
      await deleteCourse!({}, { id: '' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Delete course failed'));
    }
  });
});
