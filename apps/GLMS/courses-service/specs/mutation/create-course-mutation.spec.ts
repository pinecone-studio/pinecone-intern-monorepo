import { createCourse } from '@/graphql/resolvers/mutations';
import courseModel from '@/model/create-course-model';

jest.mock('@/model/create-course-model', () => ({
  create: jest.fn(),
}));

describe('createCourse resolver', () => {
  it('should create a new course and return its data', async () => {
    const mockInput = {
      title: 'Course Title',
      thumbnail: 'course-thumbnail.jpg',
      position: 1,
    };

    const mockNewCourse = {
      _id: '12345',
      title: mockInput.title,
      thumbnail: mockInput.thumbnail,
      position: mockInput.position,
      toObject: jest.fn(),
    };

    (courseModel.create as jest.Mock).mockResolvedValue(mockNewCourse);

    const result = await createCourse(null, mockInput);
    expect(courseModel.create).toHaveBeenCalledWith(mockInput);

    expect(result).toEqual(mockNewCourse.toObject());
  });
});
