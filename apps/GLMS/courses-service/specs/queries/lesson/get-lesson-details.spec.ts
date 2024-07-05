import { getLessonDetails } from '@/graphql/resolvers/queries';
import { LessonsModel } from '@/models/lessons.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/lessons.model', () => ({
  LessonsModel: {
    findById: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();

  const populateMock = jest.fn().mockResolvedValue(mockLesson);

  (LessonsModel.findById as jest.Mock).mockImplementation(() => ({
    populate: populateMock,
  }));
});

const mockLesson = {
  id: '1',
  courseId: {
    id: '101',
    title: 'Title test',
    thumbnail: 'Thumbnail test',
    content: 'Content test',
  },
  title: 'Title test',
  thumbnail: 'Thumbnail test',
  content: 'Thumbnail test',
};

describe('Get Lesson Details', () => {
  it('should return lesson details when found', async () => {
    const result = await getLessonDetails!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockLesson);
    expect(LessonsModel.findById).toHaveBeenCalledWith('1');

    expect(LessonsModel.findById({}, { _id: '1' }).populate).toHaveBeenCalledWith({
      path: 'courseId',
      model: 'GLMS-Courses',
    });
  });

  it('should throw an error if no lesson is found', async () => {
    (LessonsModel.findById as jest.Mock).mockImplementation(() => ({
      populate: jest.fn().mockResolvedValue(null),
    }));

    await expect(getLessonDetails!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Lesson not found');
  });

  it('should handle errors when the database fails', async () => {
    const errorMessage = 'Database error';
    (LessonsModel.findById as jest.Mock).mockImplementationOnce(() => ({
      populate: jest.fn().mockRejectedValue(new Error(errorMessage)),
    }));

    await expect(getLessonDetails!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});
