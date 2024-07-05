import { getLessons } from '@/graphql/resolvers/queries';
import { LessonsModel } from '@/models/lessons.model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/lessons.model', () => ({
  LessonsModel: {
    find: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();

  const populateMock = jest.fn().mockResolvedValue(mockLessons);

  (LessonsModel.find as jest.Mock).mockImplementation(() => ({
    populate: populateMock,
  }));
});

const mockLessons = [
  {
    _id: '1',
    courseId: '101',
    title: 'HTML Basics',
    content: 'Learn the basics of HTML',
    thumbnail: 'http://example.com/thumbnail.jpg',
    course: {
      _id: '101',
      title: 'Introduction to HTML',
      content: 'Course Description',
    },
  },
];

describe('getLessons Resolver', () => {
  it('successfully retrieves lessons with populated courses', async () => {
    const courseId = '101';
    const result = await getLessons({}, { courseId });

    expect(result).toEqual(mockLessons);
    expect(LessonsModel.find).toHaveBeenCalledWith({ courseId });
    expect(LessonsModel.find().populate).toHaveBeenCalledWith('courseId');
  });

  it('handles errors when fetching lessons fails', async () => {
    const errorMessage = 'Database error';
    const populateMock = jest.fn().mockRejectedValue(new Error(errorMessage));
    (LessonsModel.find as jest.Mock).mockImplementationOnce(() => ({
      populate: populateMock,
    }));

    await expect(getLessons({}, { courseId: '101' })).rejects.toThrow(GraphQLError);
    expect(LessonsModel.find).toHaveBeenCalledWith({ courseId: '101' });
    expect(populateMock).toHaveBeenCalledWith('courseId');
  });
});
