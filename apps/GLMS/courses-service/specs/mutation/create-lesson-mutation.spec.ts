import { createLesson } from '@/graphql/resolvers/mutations';
import lessonModel from '@/model/create-lesson-model';

jest.mock('@/model/create-lesson-model', () => ({
  create: jest.fn(),
}));

describe('createLesson resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
});

  it('should create a new lesson and return its data', async () => {
    const mockInput = {
      LessonInput: {
        title: 'Lesson Title',
        description: 'Lesson Description',
        contentImage: 'lesson-image.jpg',
      }
    };

    const mockNewLesson = {
      id: '12345',
      title: mockInput.LessonInput.title,
      description: mockInput.LessonInput.description,
      contentImage: mockInput.LessonInput.contentImage,
      toObject: jest.fn(),
    };

    (lessonModel.create as jest.Mock).mockResolvedValue(mockNewLesson);

    const result = await createLesson(null, mockInput);
    expect(lessonModel.create).toHaveBeenCalledWith(mockInput.LessonInput);
    expect(result).toEqual(mockNewLesson.toObject());
  });

  it('should throw an error if lesson creation fails', async () => {
    const mockInput = {
      LessonInput: {
        title: 'Test Title',
        description: 'Test Description',
        contentImage: 'Test Image URL'
      }
    };

    const mockError = new Error('An unknown error occurred');

    (lessonModel.create as jest.Mock).mockRejectedValue(mockError);

    await expect(createLesson({}, mockInput)).rejects.toThrow(mockError);
  });

  it('should throw an unknown error if the error type is not recognized', async () => {
    const mockInput = {
      LessonInput: {
        title: 'Test Title',
        description: 'Test Description',
        contentImage: 'Test Image URL'
      }
    };

    (lessonModel.create as jest.Mock).mockRejectedValue('Unknown error');

    await expect(createLesson({}, mockInput)).rejects.toThrow('An unknown error occurred');
  });
});
