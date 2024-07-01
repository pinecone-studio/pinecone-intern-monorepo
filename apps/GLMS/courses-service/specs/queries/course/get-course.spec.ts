import { getCourse } from '@/graphql/resolvers/queries';
import { CoursesModel } from '@/models/courses.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/courses.model', () => ({
  CoursesModel: {
    findById: jest.fn(),
  },
}));

describe('Get Course', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a course when found', async () => {
    (CoursesModel.findById as jest.Mock).mockResolvedValue({
      _id: '1',
      title: 'testTitle1',
      thumbnail: 'testThumbnail1',
      content: 'testContent1',
    });

    const result = await getCourse!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      title: 'testTitle1',
      thumbnail: 'testThumbnail1',
      content: 'testContent1',
    });
  });

  it('should throw an error when no course is found', async () => {
    (CoursesModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getCourse!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Course not found');
  });

  it('should handle errors when the database fails', async () => {
    const errorMessage = 'Database error';

    (CoursesModel.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getCourse!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});
