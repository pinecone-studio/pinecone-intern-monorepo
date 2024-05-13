import { updateCourseStatus } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/model/course-model', () => ({
  findByIdAndUpdate: jest
    .fn()
    .mockReturnValueOnce({
      id: 'courseID',
      status: 'published',
    })
    .mockReturnValueOnce(null),
}));

describe('Update course', () => {
  it('should update a course', async () => {
    const result = await updateCourseStatus!({}, { id: 'courseID', status: 'published' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      id: 'courseID',
      status: 'published',
    });
  });

  it("should throw an error if the course doesn't exist", async () => {
    try {
      await updateCourseStatus!({}, { id: 'courseID2', status: 'published' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Failed to update course'));
    }
  });
});
