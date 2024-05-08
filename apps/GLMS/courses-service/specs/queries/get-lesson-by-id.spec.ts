import { GraphQLResolveInfo } from 'graphql';
import { getLessonById } from '../../src/graphql/resolvers/queries/get-lesson-by-id';

jest.mock('../../src/model/lesson-model', () => ({
  findById: jest.fn(),
}));

describe('Get Lesson By Id', () => {
  it("should throw an error if the lesson doesn't exist", async () => {
    try {
      await getLessonById!(null || {}, { courseId: 'nonExistentId' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('cannot find lesson'));
    }
  });
});
