import { deleteSection } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/model/section-model', () => ({
    findByIdAndDelete: jest
      .fn()
      .mockReturnValueOnce({
        id: '1',
        title: 'Html',
        description: 'Html intro',
        contentImage: 'image.jpg',
      })
      .mockResolvedValueOnce(undefined)
      .mockReturnValueOnce(null),
}));

describe('Delete section', () => {
  it('should delete section', async () => {
    const result = await deleteSection!({} as string, { id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      id: '1',
      title: 'Html',
      description: 'Html intro',
      contentImage: 'image.jpg',
    });
  });

  it("should throw an error if the section doesn't exist", async () => {
    try {
      await deleteSection!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Delete section failed'));
    }
  });
  it('should throw an error if an error occurs during delete section', async () => {
    try {
      await deleteSection!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Delete section failed'));
    }
  });
});
