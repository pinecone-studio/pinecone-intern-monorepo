import { updateCourse } from '@/graphql/resolvers/mutations';
import { CoursesModel } from '@/models/courses.model';

jest.mock('@/models/courses.model', () => ({
  CoursesModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('Update Course', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a course title successfully', async () => {
    (CoursesModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: '1',
      title: 'testUpdate1',
    });

    const result = await updateCourse({}, { updateInput: { id: '1', title: 'testUpdate1' } });

    expect(result).toEqual({
      _id: '1',
      title: 'testUpdate1',
    });
  });

  it('should update a course thumbnail successfully', async () => {
    (CoursesModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: '1',
      thumbnail: 'testUpdateThumbnail',
    });

    const result = await updateCourse({}, { updateInput: { id: '1', thumbnail: 'testUpdateThumbnail1' } });

    expect(result).toEqual({
      _id: '1',
      thumbnail: 'testUpdateThumbnail',
    });
  });

  it('should update a course content successfully', async () => {
    (CoursesModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: '1',
      content: 'testUpdateContent',
    });

    const result = await updateCourse({}, { updateInput: { id: '1', content: 'testUpdateContent' } });

    expect(result).toEqual({
      _id: '1',
      content: 'testUpdateContent',
    });
  });

  it('should throw an error if no course is found', async () => {
    (CoursesModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const updateInput = { id: '1', title: 'newTitle' };

    await expect(updateCourse({}, { updateInput })).rejects.toThrow('Course not found');
  });
});
