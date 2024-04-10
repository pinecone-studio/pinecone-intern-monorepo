import courseModel from '@/model/create-course-model';
import { deleteCourse } from '@/graphql/resolvers/mutations/delete-course-mutation';
jest.mock('@/model/create-course-model', () => ({
  findByIdDelete: jest.fn(),
}));

describe('deleteCourse', () => {
    it('should delete course with specified ID', async () => {

      const mockedDeletedCourse = { _id: 'mocked_id', title: 'Mocked Course' };
      (courseModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockedDeletedCourse);
  
    
      const result = await deleteCourse({}, { _id: 'mocked_id' });

      expect(result).toEqual(mockedDeletedCourse);
  
      expect(courseModel.findByIdAndDelete).toHaveBeenCalledWith('mocked_id');
    });
  
    it('should throw an error if course is not found', async () => {
      (courseModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
  
      await expect(deleteCourse({}, { _id: 'non_existent_id' })).rejects.toThrow('Course not found');
  
      expect(courseModel.findByIdAndDelete).toHaveBeenCalledWith('non_existent_id');
    });
  
    it('should throw an error if an error occurs during database query', async () => {
      (courseModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Database error'));
  
      await expect(deleteCourse({}, { _id: 'mocked_id' })).rejects.toThrow('Failed to delete course:');
  
      expect(courseModel.findByIdAndDelete).toHaveBeenCalledWith('mocked_id');
    });
  });