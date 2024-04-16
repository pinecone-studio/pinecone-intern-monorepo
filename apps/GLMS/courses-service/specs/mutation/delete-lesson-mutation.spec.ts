import lessonModel from '@/model/create-lesson-model';
import { deleteLesson } from '../../src/graphql/resolvers/mutations/delete-course-mutation';
import { GraphQLError } from 'graphql';

jest.mock('@/model/create-lesson-model', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('deleteCourse resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null if lesson to delete is not found', async () => {
    lessonModel.findByIdAndDelete.mockResolvedValueOnce(null);

    const result = await deleteLesson(null, { id: 'nonExistentId' });

    expect(result).toBeNull();

    expect(lessonModel.findByIdAndDelete).toHaveBeenCalledWith('nonExistentId');
  });

  it('returns deleted lesson if found', async () => {
    const deletedLesson = { _id: 'lessonId', title: 'Deleted Lesson' };
    lessonModel.findByIdAndDelete.mockResolvedValueOnce(deletedLesson);

    const result = await deleteLesson(null, { id: 'validLessonId' });

    expect(result).toEqual(deletedLesson);

    expect(lessonModel.findByIdAndDelete).toHaveBeenCalledWith('validLessonId');
  });
});
