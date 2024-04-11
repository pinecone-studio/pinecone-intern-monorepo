import { getCourseById } from '../../src/graphql/resolvers/queries/get-one-course-query';
import courseModel from '@/model/create-course-model';

jest.mock('@/model/create-course-model', () => ({
  findById: jest.fn(),
}));

describe('getCourseById resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throws an error when course is not found', async () => {
    courseModel.findById.mockResolvedValueOnce(null);

    await expect(getCourseById(null, { _id: 'nonExistentId' })).rejects.toThrow('Course not found');

    expect(courseModel.findById).toHaveBeenCalledWith('nonExistentId');
  });

  it('throws an error when an error occurs during retrieval', async () => {
    const error = new Error('Database error');
    courseModel.findById.mockRejectedValueOnce(error);

    await expect(getCourseById(null, { _id: 'someId' })).rejects.toThrow('Course not found');

    expect(courseModel.findById).toHaveBeenCalledWith('someId');
  });
});
