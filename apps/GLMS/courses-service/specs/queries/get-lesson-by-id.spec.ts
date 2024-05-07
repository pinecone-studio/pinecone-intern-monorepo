import { GraphQLResolveInfo } from 'graphql';
import { getLessonById } from '../../src/graphql/resolvers/queries/get-lesson-by-id';

jest.mock('../../src/model/lesson-model', () => ({
  findById: jest
    .fn()
    .mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue({
        _id: 'mockLessonId',
        title: 'Test Lesson',
      }),
    })
    .mockReturnValueOnce({
      populate: jest.fn().mockResolvedValue(null),
    }),
}));

describe('Get Lesson By Id', () => {
  it('should return a lesson', async () => {
    const result = await getLessonById!({}, { id: 'mockLessonId' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: 'mockLessonId',
      title: 'Test Lesson',
    });
  });

  it("should throw an error if the lesson doesn't exist", async () => {
    try {
      await getLessonById!({}, { id: 'nonExistentId' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('cannot find lesson'));
    }
  });
});
