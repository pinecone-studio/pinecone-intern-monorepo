import { getSectionById } from '@/graphql/resolvers/queries/get-section-by-id';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';
 
jest.mock('@/model/section-model', () => ({
  sectionModel: {
    findById: jest.fn()
      .mockReturnValueOnce({
        _id: '1',
        title: "Html",
        description: "Html intro",
        contentImage: "image.png",
      })
      .mockResolvedValueOnce(undefined)
      .mockReturnValueOnce(null),
  },
}));

describe('get section', () => {
  it('should get a section', async () => {

    const result = await getSectionById!({} , { id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      title: "Html",
      description: "Html intro",
      contentImage: "image.png",
    });
  });

  it('should throw an error if the dsection cannot be found', async () => {
    try {
      await getSectionById!({}, { id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('unknown error'));
    }
  });

  it('should throw an error if an error occurs during section retrieval', async () => {
    try {
      await getSectionById!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
        expect(error).toEqual(new GraphQLError('unknown error'));
    }
  });
});
