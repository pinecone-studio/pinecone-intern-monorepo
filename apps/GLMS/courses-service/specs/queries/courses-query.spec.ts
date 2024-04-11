import { getCourses } from '../../src/graphql/resolvers/queries/courses-query';
import courseModel from '@/model/create-course-model';

jest.mock('@/model/create-course-model', () => ({
    find: jest.fn(),
  }));
  describe('getCourses', () => {
    it('should return courses from courseModel', async () => {
      const courses: any[] = [{ title: 'Course 1' }, { title: 'Course 2' }];
      (courseModel.find as jest.Mock).mockResolvedValue(courses);
      const result = await getCourses();
      expect(result).toEqual(courses);
  
      expect(courseModel.find).toHaveBeenCalledTimes(1);
    });
  });