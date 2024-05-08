import { GraphQLError } from 'graphql';
import courseModel from '@/model/course-model';
import { createCourse } from '@/graphql/resolvers/mutations';

const mockInput = {
  title: 'English',
  description: 'Learning english',
  thumbnail: 'course-thumbnail.jpg',
  status: 'Noorog',
};

jest.mock('../../../courses-service/src/model/course-model.ts', () => ({
  create: jest
    .fn()
    .mockReturnValueOnce({
      title: 'English',
      description: 'Learning english',
      thumbnail: 'course-thumbnail.jpg',
      status: 'Noorog',
    })
    .mockRejectedValueOnce(new Error('An unknown error occurred')),
}));

describe('createCourse resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a course successfully', async () => {
    const courseInput = { title: 'Test Course', description: 'Test Description' };
    const mockCourse = { id: '123', ...courseInput };
    jest.spyOn(courseModel, 'create').mockResolvedValue(mockCourse);

    const result = await createCourse(null, { courseInput });
    expect(result).toEqual(mockCourse);
    expect(courseModel.create).toHaveBeenCalledWith(courseInput);
  });

  it('throws an error when course creation fails', async () => {
    const courseInput = { title: 'Test Course', description: 'Test Description' };
    const errorMessage = 'Database error';
    jest.spyOn(courseModel, 'create').mockRejectedValue(new Error(errorMessage));

    await expect(createCourse(null, { courseInput })).rejects.toThrow(GraphQLError);
    expect(courseModel.create).toHaveBeenCalledWith(courseInput);
  });
});
