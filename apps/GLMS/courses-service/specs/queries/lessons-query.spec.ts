import lessonModel from '@/model/create-lesson-model';
import { getLessons} from '../../src/graphql/resolvers/queries/lessons-query';
import courseModel from '@/model/create-lesson-model';

jest.mock('@/model/create-lesson-model', () => ({
    find: jest.fn(),
  }));
  describe('getCourses', () => {
    it('should return courses from courseModel', async () => {
      const courses: any[] = [{ title: 'Course 1' }, { title: 'Course 2' }];
      (courseModel.find as jest.Mock).mockResolvedValue(courses);
      const result = await getLessons();
      expect(result).toEqual(courses);

      expect(courseModel.find).toHaveBeenCalledTimes(1);
    });
    it('should handle error when lessonModel.find fails', async () => {

      (lessonModel.find as jest.Mock).mockRejectedValue(new Error('cannot find lesson'));

      await expect(getLessons()).rejects.toThrow('cannot find lesson');

      expect(lessonModel.find).toHaveBeenCalledTimes(2);
    });
  });