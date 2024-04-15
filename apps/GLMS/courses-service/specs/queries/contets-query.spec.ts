import { getContents } from '@/graphql/resolvers/queries';
import courseModel from '@/model/create-course-model';

jest.mock('@/model/create-course-model', () => ({
    find: jest.fn(),
  }));
  describe('getContents', () => {
    it('should return courses from courseModel', async () => {
      const content: any[] = [{ title: 'Course 1' }, { title: 'Course 2' }];
      (courseModel.find as jest.Mock).mockResolvedValue(content);
      const result = await getContents();
      expect(result).toEqual(content);
  
      expect(courseModel.find).toHaveBeenCalledTimes(1);
    });
  });