import { deleteLesson} from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/model/lesson-model', () => ({
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        id: '1',
        courseId: "2",
        title:"html",
        thumbnai:"image.jpeg",
        position:1,
      })
}));

describe('Delete lesson', () => {
  it('should delete lesson', async () => {
    const result = await deleteLesson!({} as string, { id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
        id: '1',
        courseId: "2",
        title:"html",
        thumbnai:"image.jpeg",
        position:1,
    });
  });

  it("should throw an error if the lesson doesn't exist", async () => {
    try {
      await deleteLesson!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Delete lesson failed'));
    }
  });
  it('should throw an error if an error occurs during delete lesson', async () => {
    try {
      await deleteLesson!({}, { id: '' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Delete lesson failed'));
    }
  });
})