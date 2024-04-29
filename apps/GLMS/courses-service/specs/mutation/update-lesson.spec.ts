
import { updateLesson } from '../../src/graphql/resolvers/mutations/update-lesson';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/model/lesson-model', () => ({
  findByIdAndUpdate: jest
    .fn()
    .mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue({
        _id: 'mockLessonId',
        title: 'test',
      }),
    })
    .mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(null),
    }),
}));

describe('Update Lesson', () => {
  it('should update a lesson', async () => {
    const result = await updateLesson!({}, { id: 'mockLessonId', title: 'test', thumbnail: 'test.jpg', position: 1, sectionIds: [] }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: 'mockLessonId',
      title: 'test',
    });
  });

  it("should throw an error if the lesson doesn't exist", async () => {
    try {
      await updateLesson!({}, { id: 'nonExistentId', title: 'test', thumbnail: 'test.jpg', position: 1, sectionIds: [] }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('An unknown error occurred'));
    }
  });
});
