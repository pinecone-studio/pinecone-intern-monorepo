import { createCourse } from '@/graphql/resolvers/mutations';
import { CoursesModel } from '@/models/courses.model';

jest.mock('@/models/courses.model', () => ({
  CoursesModel: {
    create: jest.fn() as jest.Mock,
  },
}));

const input = {
  title: 'testTitle1',
  thumbnail: 'testThumbnail1',
  content: 'testContent1',
};

describe('Create Course', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a course successfully', async () => {
    (CoursesModel.create as jest.Mock).mockResolvedValue({
      _id: '1',
      title: 'testTitle1',
      thumbnail: 'testThumbnail1',
      content: 'testContent1',
    });

    const result = await createCourse({}, { createInput: input });

    expect(result).toEqual({
      _id: '1',
      title: 'testTitle1',
      thumbnail: 'testThumbnail1',
      content: 'testContent1',
    });
    expect(CoursesModel.create).toHaveBeenCalledTimes(1);
    expect(CoursesModel.create).toHaveBeenCalledWith({ ...input });
  });

  it('should handle errors when database operation fails', async () => {
    const errorMessage = 'Database operation failed';

    (CoursesModel.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(createCourse({}, { createInput: input })).rejects.toThrow(errorMessage);

    expect(CoursesModel.create).toHaveBeenCalledTimes(1);
    expect(CoursesModel.create).toHaveBeenCalledWith({ ...input });
  });
});
