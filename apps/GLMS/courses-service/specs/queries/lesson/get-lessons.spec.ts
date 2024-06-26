import { getLessons } from '@/graphql/resolvers/queries';
import { LessonsModel } from '@/models/lessons';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/lessons', () => ({
  LessonsModel: {
    find: jest.fn(),
  },
}));

const mockCourseId = '1';

const mockLessons = [
  {
    id: '101',
    courseId: '1',
    title: 'Introduction to HTML',
    thumbnail: '',
    content: '',
    position: 1,
    createdAt: new Date(),
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Get Lessons', () => {
  it('should fetch lessons correctly for a given courseId', async () => {
    (LessonsModel.find as jest.Mock).mockResolvedValue(mockLessons);

    const result = await getLessons!({}, { courseId: mockCourseId }, {}, {} as GraphQLResolveInfo);

    expect(LessonsModel.find).toHaveBeenCalledWith({ courseId: mockCourseId });
    expect(result).toEqual(mockLessons);
  });

  it('should return an empty array when no lessons are found', async () => {
    (LessonsModel.find as jest.Mock).mockResolvedValueOnce([]);

    const result = await getLessons!({}, { courseId: mockCourseId }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([]);
  });

  it('should handle errors when the database fails', async () => {
    const errorMessage = 'Database error';

    (LessonsModel.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getLessons!({}, { courseId: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});
