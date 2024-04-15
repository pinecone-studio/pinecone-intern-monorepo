import lessonModel from '@/model/create-course-model';
import { deleteLessons } from '../../src/graphql/resolvers/mutations/delete-lesson-mutation';
import courseModel from '@/model/create-course-model';

jest.mock('@/model/create-course-model', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('deleteCourse resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null if course to delete is not found', async () => {
    lessonModel.findByIdAndDelete.mockResolvedValueOnce(null);

    const result = await deleteLessons(null, { _id: 'nonExistentId' });

    expect(result).toBeNull();
    expect(lessonModel.findByIdAndDelete).toHaveBeenCalledWith('nonExistentId');
  });

  it('throws an error when an error occurs during deletion', async () => {
    const error = new Error('Database error');
    lessonModel.findByIdAndDelete.mockRejectedValueOnce(error);

    await expect(deleteLessons(null, { _id: 'someId' })).rejects.toThrow('Failed to delete course.');

    expect(lessonModel.findByIdAndDelete).toHaveBeenCalledWith('someId');
  });
});
