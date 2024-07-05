import { createLesson } from '@/graphql/resolvers/mutations';
import { LessonsModel } from '@/models/lessons.model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/lessons.model', () => ({
  LessonsModel: {
    create: jest.fn(),
    findById: jest.fn().mockReturnThis(),
    populate: jest.fn(),
  },
}));

const input = {
  courseId: '12345678abcd',
  title: 'Web Development',
  thumbnail: 'http://example.com/thumbnail.jpg',
  content: 'Learn how to build websites!',
};

describe('Create Lesson', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create and return a populated lesson successfully', async () => {
    (LessonsModel.create as jest.Mock).mockResolvedValue({
      _id: '1',
      ...input,
    });
    (LessonsModel.populate as jest.Mock).mockResolvedValue({
      _id: '1',
      ...input,
      course: { title: 'Intro to Web Development', content: 'Course details here' },
    });

    const result = await createLesson({}, { createInput: input });

    expect(result).toEqual({
      _id: '1',
      ...input,
      course: { title: 'Intro to Web Development', content: 'Course details here' },
    });
    expect(LessonsModel.create).toHaveBeenCalledWith(input);
    expect(LessonsModel.findById).toHaveBeenCalledWith('1');
    expect(LessonsModel.populate).toHaveBeenCalledWith({
      path: 'courseId',
      model: 'GLMS-Courses',
    });
  });

  it('should handle errors when creation fails', async () => {
    const errorMessage = 'Failed to create lesson';
    (LessonsModel.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(createLesson({}, { createInput: input })).rejects.toThrow(GraphQLError);
    expect(LessonsModel.create).toHaveBeenCalledWith(input);
  });
});
