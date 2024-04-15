import { getLessons } from '@/graphql/resolvers/queries';
import lessonModel from '@/model/create-course-model';


jest.mock('@/model/create-course-model', () => ({
    find: jest.fn(),
  }));
  describe('getLessons', () => {
    it('should return lessons from lessonModel', async () => {
      const lesson: any[] = [{ title: 'Course 1' }, { title: 'Course 2' }];
      (lessonModel.find as jest.Mock).mockResolvedValue(lesson);
      const result = await getLessons();
      expect(result).toEqual(lesson);
  
      expect(lessonModel.find).toHaveBeenCalledTimes(1);
    });
  });