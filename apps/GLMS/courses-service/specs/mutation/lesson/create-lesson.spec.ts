import { createLesson } from '@/graphql/resolvers/mutations';
import { LessonsModel } from '@/models/lessons';

jest.mock('@/models/lessons', () => ({
  LessonsModel: {
    create: jest.fn(),
  },
}));

const input = {
  courseId: '12345678abcd',
  title: 'LessonTitle',
  content: 'LessonContent',
  thumbnail: 'LessonThumbnail',
};

describe('Create Lesson', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a lesson successfully', async () => {
    (LessonsModel.create as jest.Mock).mockResolvedValue({
      _id: '1',
      courseId: '12345678abcd',
      title: 'LessonTitle',
      content: 'LessonContent',
      thumbnail: 'LessonThumbnail',
    });

    const result = await createLesson({}, { createInput: input });

    expect(result).toEqual({
      _id: '1',
      courseId: '12345678abcd',
      title: 'LessonTitle',
      content: 'LessonContent',
      thumbnail: 'LessonThumbnail',
    });
    expect(LessonsModel.create).toHaveBeenCalledTimes(1);
    expect(LessonsModel.create).toHaveBeenCalledWith({ ...input });
  });

  it('should handle errors when database operation fails', async () => {
    const errorMessage = 'Database operation failed';

    (LessonsModel.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(createLesson({}, { createInput: input })).rejects.toThrow(errorMessage);

    expect(LessonsModel.create).toHaveBeenCalledTimes(1);
    expect(LessonsModel.create).toHaveBeenCalledWith({ ...input });
  });
});
