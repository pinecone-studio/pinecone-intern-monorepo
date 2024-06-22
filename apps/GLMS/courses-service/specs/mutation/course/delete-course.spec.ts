import { deleteCourse } from '@/graphql/resolvers/mutations';
import { CoursesModel } from '@/models/courses';

jest.mock('@/models/courses', () => ({
  CoursesModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('Delete Course', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a course successfully', async () => {
    (CoursesModel.findByIdAndDelete as jest.Mock).mockResolvedValue({
      _id: '1',
      title: 'testTitle',
      thumbnail: 'testThumbnail',
      content: 'testContent',
    });

    const result = await deleteCourse(null, { id: '1' });
    expect(result).toEqual({
      _id: '1',
      title: 'testTitle',
      thumbnail: 'testThumbnail',
      content: 'testContent',
    });

    expect(CoursesModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it('should throw an error when no course is found to delete', async () => {
    (CoursesModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteCourse(null, { id: '2' })).rejects.toThrow('Course not found');
  });

  it('should handle errors when database operation fails', async () => {
    const errorMessage = 'Database operation failed';

    (CoursesModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(deleteCourse(null, { id: '1' })).rejects.toThrow(errorMessage);

    expect(CoursesModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
