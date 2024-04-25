import courseModel from '@/model/course-model';
import { getCourses } from '@/graphql/resolvers/queries/courses-get';

jest.mock('@/model/course-model', () => ({
  find: jest.fn(),
}));
describe('getCourses', () => {
  it('1. should return course from courseModel', async () => {
    const mockCourses = [{ id: '1', title: 'Lesson 1', description: 'hi' }];
    (courseModel.find as jest.Mock).mockResolvedValue(mockCourses);
    const result = await getCourses();
    expect(result).toEqual(mockCourses);

    expect(courseModel.find).toHaveBeenCalledTimes(1);
  });
  it('2. should handle error when courseModel.find fails', async () => {
    (courseModel.find as jest.Mock).mockRejectedValue(new Error('data base error'));

    await expect(getCourses()).rejects.toThrow('cannot find course');
  });
});
