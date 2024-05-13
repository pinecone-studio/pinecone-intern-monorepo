import { updateCourse } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/model/course-model', () => ({
  findByIdAndUpdate: jest
    .fn()
    .mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue({
        _id: 'mockCourseId',
        status: 'Архив',
      }),
    })
    .mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(null),
    }),
}));

describe('Update Course', () => {
  it('should update a course', async () => {
    const result = await updateCourse!({}, { id: 'mockCourseId', status: 'Архив' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: 'mockCourseId',
      status: 'Архив',
    });
  });

  it("should throw an error if the course doesn't exist", async () => {
    try {
      await updateCourse!({}, { id: 'nonExistentId', status: 'Архив' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('An unknown error occurred'));
    }
  });
});
