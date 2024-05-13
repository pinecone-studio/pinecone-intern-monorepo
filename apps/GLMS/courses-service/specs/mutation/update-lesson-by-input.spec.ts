import { updateLessonByInput, updateSection } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/model/lesson-model', () => ({
  findByIdAndUpdate: jest
    .fn()
    .mockReturnValueOnce({
      id: '1',
      title: 'Html',
      thumbnail: 'image.jpg',
    })
    .mockReturnValueOnce(null),
}));

describe('Update lesson', () => {
  it('should update a lesson', async () => {
    const result = await updateLessonByInput!({}, { id: '1', lessonInput: { title: 'Html', thumbnail: 'image.jpg' } }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      id: '1',
      title: 'Html',
      thumbnail: 'image.jpg',
    });
  });

  it("should throw an error if the lesson doesn't exist", async () => {
    try {
        await updateLessonByInput!({}, { id: '1', lessonInput: { title: 'Html', thumbnail: 'image.jpg' } }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Failed to update lesson'));
    }
  });
  it('should throw error if delete section failed', async () => {
    try {
        await updateLessonByInput!({}, { id: '1', lessonInput: { title: 'Html', thumbnail: 'image.jpg' } }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Failed to update lesson'));
    }
  });
});
