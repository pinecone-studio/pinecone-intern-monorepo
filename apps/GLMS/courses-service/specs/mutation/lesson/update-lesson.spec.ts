import { updateLesson } from '@/graphql/resolvers/mutations';
import { LessonsModel } from '@/models/lessons.model';
import { GraphQLError } from 'graphql';

jest.mock('@/models/lessons.model', () => ({
  LessonsModel: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('Update Lesson', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a lesson title successfully', async () => {
    (LessonsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: '1',
      title: 'UpdatedTitle',
    });

    const result = await updateLesson(
      {},
      {
        updateInput: {
          id: '1',
          title: 'UpdatedTitle',
          content: '',
          courseId: '',
          thumbnail: '',
        },
      }
    );

    expect(result).toEqual({
      _id: '1',
      title: 'UpdatedTitle',
    });
  });

  it('should update a lesson content successfully', async () => {
    (LessonsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: '1',
      content: 'UpdatedContent',
    });

    const result = await updateLesson(
      {},
      {
        updateInput: {
          id: '1',
          title: '',
          content: 'UpdatedContent',
          courseId: '',
          thumbnail: '',
        },
      }
    );

    expect(result).toEqual({
      _id: '1',
      content: 'UpdatedContent',
    });
  });

  it('should update a lesson thumbnail successfully', async () => {
    (LessonsModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: '1',
      thumbnail: 'UpdatedThumbnail',
    });

    const result = await updateLesson(
      {},
      {
        updateInput: {
          id: '1',
          title: '',
          content: '',
          courseId: '',
          thumbnail: 'UpdatedThumbnail',
        },
      }
    );

    expect(result).toEqual({
      _id: '1',
      thumbnail: 'UpdatedThumbnail',
    });
  });

  it('should throw an error if update fails', async () => {
    const errorMessage = 'Database operation failed';

    (LessonsModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new GraphQLError(errorMessage));

    await expect(
      updateLesson(
        {},
        {
          updateInput: {
            id: '1',
            title: 'UpdatedTitle',
            content: '',
            courseId: '',
            thumbnail: '',
          },
        }
      )
    ).rejects.toThrow(errorMessage);
  });
});