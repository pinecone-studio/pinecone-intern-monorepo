import { getLessonDetails } from '@/graphql/resolvers/queries';
import { LessonsModel } from '@/models/lessons';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/lessons', () => ({
  LessonsModel: {
    findById: jest.fn(),
  },
}));

describe('Get Lesson Details', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a lesson details when found', async () => {
    (LessonsModel.findById as jest.Mock).mockResolvedValue({
      id: '1',
      courseId: '101',
      title: 'Test Title',
      thumbnail: 'Test Thumbnail',
      content: 'Test Content',
    });

    const result = await getLessonDetails!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      id: '1',
      courseId: '101',
      title: 'Test Title',
      thumbnail: 'Test Thumbnail',
      content: 'Test Content',
    });
  });

  it('should throw an error when nop lesson details is found', async () => {
    (LessonsModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getLessonDetails!({}, { id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Lesson not found');
  });

  it('should handle errors when the database fails', async () => {
    const errorMessage = 'Database error';

    (LessonsModel.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getLessonDetails!({}, { id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});
