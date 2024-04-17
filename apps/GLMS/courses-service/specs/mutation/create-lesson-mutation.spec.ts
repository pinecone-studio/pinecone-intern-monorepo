import { createLesson } from '@/graphql/resolvers/mutations';
import lessonModel from '@/model/create-lesson-model';

jest.mock('@/model/create-lesson-model', () => ({
  create: jest.fn(),
}));

describe('createCourse resolver', () => {
  it('should create a new course and return its data', async () => {
    const mockInput = {
      LessonInput:{
        title: 'Course Title',
        thumbnail: 'course-thumbnail.jpg',
        position: 1,
      }

    };

    const mockNewCourse = {
      id: '12345',
      title: mockInput.LessonInput.title,
      thumbnail: mockInput.LessonInput.thumbnail,
      position: mockInput.LessonInput.position,
      toObject: jest.fn(),
    };

    (lessonModel.create as jest.Mock).mockResolvedValue(mockNewCourse);

    const result = await createLesson(null, mockInput);
    expect(lessonModel.create).toHaveBeenCalledWith(mockInput);

    expect(result).toEqual(mockNewCourse.toObject());
  });
  it('should throw an error if content creation fails', async () => {
    const mockInput = {
        title: 'Test Title',
        description: 'Test Description',
        contentImage: 'Test Image URL'
    };

    const mockError = new Error('An unknown error occurred');

    (lessonModel.create as jest.Mock).mockRejectedValue(mockError);

    await expect(createLesson({}, mockInput)).rejects.toThrow(mockError);
});
it('should throw an unknown error if the error type is not recognized', async () => {
  const mockInput = {
      title: 'Test Title',
      description: 'Test Description',
      contentImage: 'Test Image URL'
  };
  (lessonModel.create as jest.Mock).mockRejectedValue('Unknown error');
  await expect(createLesson({}, mockInput)).rejects.toThrow('An unknown error occurred');
});
});
