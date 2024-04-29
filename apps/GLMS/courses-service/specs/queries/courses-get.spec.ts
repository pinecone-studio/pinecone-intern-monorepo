
import courseModel from '@/model/course-model';
import { getCourses } from '../../src/graphql/resolvers/queries/courses-get';

jest.mock('@/model/course-model', () => ({
    find: jest.fn(),
  }));
  describe('getCourses', () => {
    it('should return course from courseModel', async () => {
      const mockCourse = [{ id: '1', title: 'Lesson 1', descritpion:"test", thumbnail:"url" ,position:1 }];
      (courseModel.find as jest.Mock).mockResolvedValue(mockCourse);
      const result = await getCourses();
      expect(result).toEqual(mockCourse);

      expect(courseModel.find).toHaveBeenCalledTimes(1);
    });
    it('should handle error when courseModel.find fails', async () => {

      (courseModel.find as jest.Mock).mockRejectedValue(new Error('data base error'));

      await expect(getCourses()).rejects.toThrow('cannot find course');

      expect(courseModel.find).toHaveBeenCalledTimes(2);
    });
  });