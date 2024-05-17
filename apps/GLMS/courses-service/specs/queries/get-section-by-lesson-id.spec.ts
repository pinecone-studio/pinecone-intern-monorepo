import { GraphQLError } from 'graphql';
import sectionModel from '@/model/section-model';
import { getSectionByLessonId } from '@/graphql/resolvers/queries';

jest.mock('@/model/section-model', () => ({
  find: jest.fn(),
}));

describe('getSectionByLessonId resolver', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return sections when lessonId is provided', async () => {
    const lessonId = 'your-lesson-id';
    const sectionsMock = [
      { id: '1', title: 'Section 1' },
      { id: '2', title: 'Section 2' },
    ];

    sectionModel.find.mockResolvedValue(sectionsMock);

    const result = await getSectionByLessonId(null, { lessonId });

    expect(result).toEqual(sectionsMock);
    expect(sectionModel.find).toHaveBeenCalledWith({ lessonId });
  });

  it('should throw a GraphQLError when sectionModel.find throws an error', async () => {
    const lessonId = 'your-lesson-id';
    const errorMessage = 'Error finding sections';

    sectionModel.find.mockRejectedValue(new Error(errorMessage));

    await expect(getSectionByLessonId(null, { lessonId })).rejects.toThrow(GraphQLError);

    expect(sectionModel.find).toHaveBeenCalledWith({ lessonId });
  });
});
