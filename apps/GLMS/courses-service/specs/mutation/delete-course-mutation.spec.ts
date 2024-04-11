import { deleteCourse } from '../../src/graphql/resolvers/mutations/delete-course-mutation';
import courseModel from '@/model/create-course-model';

jest.mock('@/model/create-course-model', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('deleteCourse resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null if course to delete is not found', async () => {
    courseModel.findByIdAndDelete.mockResolvedValueOnce(null);

    const result = await deleteCourse(null, { _id: 'nonExistentId' });

    expect(result).toBeNull();
    expect(courseModel.findByIdAndDelete).toHaveBeenCalledWith('nonExistentId');
  });

  it('throws an error when an error occurs during deletion', async () => {
    const error = new Error('Database error');
    courseModel.findByIdAndDelete.mockRejectedValueOnce(error);

    await expect(deleteCourse(null, { _id: 'someId' })).rejects.toThrow('Failed to delete course.');

    expect(courseModel.findByIdAndDelete).toHaveBeenCalledWith('someId');
  });
});
