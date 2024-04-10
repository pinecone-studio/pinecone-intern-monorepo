import courseModel from '@/model/create-course-model';
import { getCourseById } from '../../src/graphql/resolvers/queries/get-one-course-query';


jest.mock('@/model/create-course-model', () => ({
  findById: jest.fn(),
}));

describe('getCourseById', () => {
  it('should return course with specified ID', async () => {
    const mockedCourse = { _id: 'mocked_id', title: 'Mocked Course' };
    (courseModel.findById as jest.Mock).mockResolvedValue(mockedCourse);

    const result = await getCourseById({}, { _id: 'mocked_id' });
    expect(result).toEqual(mockedCourse);
    expect(courseModel.findById).toHaveBeenCalledWith('mocked_id');
  });

  it('should throw an error if course is not found', async () => {
    (courseModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getCourseById({}, { _id: 'non_existent_id' })).rejects.toThrow('Course not found');

    expect(courseModel.findById).toHaveBeenCalledWith('non_existent_id');
  });

  it('should throw an error if an error occurs during database query', async () => {
    (courseModel.findById as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getCourseById({}, { _id: 'mocked_id' })).rejects.toThrow('Course not found');

    expect(courseModel.findById).toHaveBeenCalledWith('mocked_id');
  });
});
