import { deleteLesson } from '@/graphql/resolvers/mutations';
import { LessonsModel } from '@/models/lessons.model';

jest.mock('@/models/lessons.model', () => ({
  LessonsModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('Delete Lesson', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a lesson successfully', async () => {
    (LessonsModel.findByIdAndDelete as jest.Mock).mockResolvedValue({
      id: '1',
      title: 'Test Title',
      thumbnail: 'Test Thumbnail',
      content: 'Test Content',
    });

    const result = await deleteLesson(null, { id: '1' });

    expect(result).toEqual({
      id: '1',
      title: 'Test Title',
      thumbnail: 'Test Thumbnail',
      content: 'Test Content',
    });

    expect(LessonsModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it('should throw an error when no lesson is found to delete', async () => {
    (LessonsModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(deleteLesson(null, { id: '2' })).rejects.toThrow('Lesson not found');
  });

  it('should handle errors when database operation fails', async () => {
    const errorMessage = 'Database operation failed';

    (LessonsModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(deleteLesson(null, { id: '1' })).rejects.toThrow(errorMessage);

    expect(LessonsModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});