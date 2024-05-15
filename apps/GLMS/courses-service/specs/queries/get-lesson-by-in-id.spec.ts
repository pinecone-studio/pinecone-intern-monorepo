import { GraphQLError } from 'graphql';
import lessonModel from '@/model/lesson-model';
import { getLessonByInId } from '@/graphql/resolvers/queries';

jest.mock('@/model/lesson-model', () => ({
  findById: jest.fn(),
}));

describe('getLessonByInId resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a course when found by ID', async () => {
    const lessonId = '123';
    const mockLesson = { id: lessonId, title: 'Test Lesson' };
    jest.spyOn(lessonModel, 'findById').mockResolvedValue(mockLesson);

    const result = await getLessonByInId(null, { id: lessonId });
    expect(result).toEqual(mockLesson);
    expect(lessonModel.findById).toHaveBeenCalledWith(lessonId);
  });

  it('throws an error when course is not found by ID', async () => {
    const lessonId = '456';
    jest.spyOn(lessonModel, 'findById').mockResolvedValue(null);

    await expect(getLessonByInId(null, { id: lessonId })).rejects.toThrow(GraphQLError);
    expect(lessonModel.findById).toHaveBeenCalledWith(courseId);
  });

  it('throws an error when an error occurs during findById', async () => {
    const lessonId = '789';
    const errorMessage = 'Database error';
    jest.spyOn(lessonModel, 'findById').mockRejectedValue(new Error(errorMessage));

    await expect(getLessonByInId(null, { id: lessonId })).rejects.toThrow(GraphQLError);
    expect(lessonModel.findById).toHaveBeenCalledWith(lessonId);
  });
});
