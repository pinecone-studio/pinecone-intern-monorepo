import { GraphQLError } from 'graphql';
import courseModel from '@/model/course-model';
import { getCourseById } from '@/graphql/resolvers/queries';

jest.mock('@/model/course-model', () => ({
  findById: jest.fn(),
}));

describe('getCourseById resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a course when found by ID', async () => {
    const courseId = '123';
    const mockCourse = { id: courseId, title: 'Test Course' };
    jest.spyOn(courseModel, 'findById').mockResolvedValue(mockCourse);

    const result = await getCourseById(null, { id: courseId });
    expect(result).toEqual(mockCourse);
    expect(courseModel.findById).toHaveBeenCalledWith(courseId);
  });

  it('throws an error when course is not found by ID', async () => {
    const courseId = '456';
    jest.spyOn(courseModel, 'findById').mockResolvedValue(null);

    await expect(getCourseById(null, { id: courseId })).rejects.toThrow(GraphQLError);
    expect(courseModel.findById).toHaveBeenCalledWith(courseId);
  });

  it('throws an error when an error occurs during findById', async () => {
    const courseId = '789';
    const errorMessage = 'Database error';
    jest.spyOn(courseModel, 'findById').mockRejectedValue(new Error(errorMessage));

    await expect(getCourseById(null, { id: courseId })).rejects.toThrow(GraphQLError);
    expect(courseModel.findById).toHaveBeenCalledWith(courseId);
  });
});
