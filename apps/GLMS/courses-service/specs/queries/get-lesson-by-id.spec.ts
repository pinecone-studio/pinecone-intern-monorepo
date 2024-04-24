
import { GraphQLError } from 'graphql';
import { getLessonById } from '../../src/graphql/resolvers/queries/get-lesson-by-id';
import lessonModel from '../../src/model/lesson-model';

jest.mock('../../src/model/lesson-model', () => ({
  findById: jest.fn(),
}));

describe('getLessonById resolver', () => {
  it('should return lesson when found', async () => {
    const id = 'somelessonid';
    const lesson = { _id: id, title: 'Lesson Title', content: 'Lesson Content' };
    lessonModel.findById.mockResolvedValueOnce(lesson);

    const result = await getLessonById(null, { id });

    expect(result).toEqual(lesson);
    expect(lessonModel.findById).toHaveBeenCalledWith(id);
  });

  it('should throw GraphQLError when lesson not found', async () => {
    const id = 'somelessonid';
    lessonModel.findById.mockResolvedValueOnce(null);

    await expect(getLessonById(null, { id })).rejects.toThrow(GraphQLError);
    expect(lessonModel.findById).toHaveBeenCalledWith(id);
  });

  it('should throw GraphQLError when findById throws error', async () => {
    const id = 'somelessonid';
    const errorMessage = 'An error occurred';
    lessonModel.findById.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getLessonById(null, { id })).rejects.toThrow(GraphQLError);
    expect(lessonModel.findById).toHaveBeenCalledWith(id);
  });
});