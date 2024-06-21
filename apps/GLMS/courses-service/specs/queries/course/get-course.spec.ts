// Importing necessary modules and types
import { getCourse } from '@/graphql/resolvers/queries';
import { CoursesModel } from '@/models/courses';

jest.mock('@/models/courses', () => ({
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

    const result = await getCourse({}, { _id: '1' });
    expect(result).toEqual({
      _id: '1',
      title: 'testTitle1',
      thumbnail: 'testThumbnail1',
      content: 'testContent1',
    });
  });

  it('should throw an error when no course is found', async () => {
    (CoursesModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getCourse({}, { _id: '1' })).rejects.toThrow('Course not found');
  });

  it('should handle errors when the database fails', async () => {
    (CoursesModel.findById as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(getCourse({}, { _id: '1' })).rejects.toThrow('Database error');
  });
});
