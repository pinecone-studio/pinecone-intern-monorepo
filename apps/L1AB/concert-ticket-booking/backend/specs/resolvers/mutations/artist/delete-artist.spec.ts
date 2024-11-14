import { GraphQLResolveInfo } from 'graphql';
import { deleteArtist } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  ArtistModel: {
    findByIdAndDelete: jest.fn().mockResolvedValueOnce({ _id: '2' }).mockReturnValue(null),
  },
}));

describe('Delete Artist', () => {
  it('It should delete Artist', async () => {
    const result = await deleteArtist!({}, { _id: '2' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({ _id: '2' });
  });

  it('It should throw an error', async () => {
    try {
      await deleteArtist!({}, { _id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Artist not deleted'));
    }
  });
});
