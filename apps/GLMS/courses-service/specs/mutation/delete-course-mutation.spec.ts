import lessonModel from '@/model/create-lesson-model';
import {  deleteLesson } from '../../src/graphql/resolvers/mutations/delete-course-mutation';

jest.mock('@/model/create-lesson-model', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('deleteCourse resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null if course to delete is not found', async () => {
    lessonModel.findByIdAndDelete.mockResolvedValueOnce(null);

    const result = await deleteLesson(null, { id: 'nonExistentId' });

    expect(result).toBeNull();
    expect(lessonModel.findByIdAndDelete).toHaveBeenCalledWith('nonExistentId');
  });

  it('throws an error when an error occurs during deletion', async () => {
    const error = new Error('Database error');
    lessonModel.findByIdAndDelete.mockRejectedValueOnce(error);

    await expect(deleteLesson(null, { id: 'someId' })).rejects.toThrow('Failed to delete course.');

    expect(lessonModel.findByIdAndDelete).toHaveBeenCalledWith('someId');
  });
});
