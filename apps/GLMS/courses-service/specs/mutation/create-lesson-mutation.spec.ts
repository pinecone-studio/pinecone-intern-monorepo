import { createLesson } from '@/graphql/resolvers/mutations';
import lessonModel from '@/model/create-lesson-model';

jest.mock('@/model/create-lesson-model', () => ({
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

    (lessonModel.create as jest.Mock).mockResolvedValue(mockNewCourse);

    const result = await createLesson(null, mockInput);
    expect(lessonModel.create).toHaveBeenCalledWith(mockInput);

    expect(result).toEqual(mockNewCourse.toObject());
  });
});
