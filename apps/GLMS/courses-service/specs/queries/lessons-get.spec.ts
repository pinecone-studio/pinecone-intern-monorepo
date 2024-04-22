
import { getLessons } from '../../src/graphql/resolvers/queries/lessons-get';
import lessonModel from '@/model/lesson-model';

jest.mock('@/model/lesson-model', () => ({
    find: jest.fn(),
  }));
  describe('getLessons', () => {
    it('should return lesson from lessonModel', async () => {
      const mockLessons = [{ id: '1', title: 'Lesson 1', sections: [] }];
      (lessonModel.find as jest.Mock).mockResolvedValue(mockLessons);
      const result = await getLessons();
      expect(result).toEqual(mockLessons);

      expect(lessonModel.find).toHaveBeenCalledTimes(1);
    });
    it('should handle error when lessonModel.find fails', async () => {

      (lessonModel.find as jest.Mock).mockRejectedValue(new Error('data base error'));

      await expect(getLessons()).rejects.toThrow('cannot find lesson');

      expect(lessonModel.find).toHaveBeenCalledTimes(2);
    });
  });