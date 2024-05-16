import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import lessonModel from '@/model/lesson-model';
import { getLessonInId } from '@/graphql/resolvers/queries';

jest.mock('@/model/lesson-model', () => ({
  findById: jest.fn(),
}));

describe('getLessonInId resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a course when found by ID', async () => {
    const lessonId = '123';
    const mockLesson = { id: lessonId, title: 'Test Lesson' };
    jest.spyOn(lessonModel, 'findById').mockResolvedValue(mockLesson);

    const result = await getLessonInId!({}, { id: lessonId }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockLesson);
    expect(lessonModel.findById).toHaveBeenCalledWith(lessonId);
  });

  it('throws an error when course is not found by ID', async () => {
    const lessonId = '456';
    jest.spyOn(lessonModel, 'findById').mockResolvedValue(null);

    await expect(getLessonInId!({}, { id: lessonId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
    expect(lessonModel.findById).toHaveBeenCalledWith(lessonId);
  });

  it('throws an error when an error occurs during findById', async () => {
    const lessonId = '789';
    const errorMessage = 'Database error';
    jest.spyOn(lessonModel, 'findById').mockRejectedValue(new Error(errorMessage));

    await expect(getLessonInId!({}, { id: lessonId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
    expect(lessonModel.findById).toHaveBeenCalledWith(lessonId);
  });
});
