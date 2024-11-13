import { GraphQLResolveInfo } from 'graphql';
import { getArtists } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  ArtistModel: {
    find: jest.fn().mockResolvedValue([]),
  },
}));

describe('getArtist', () => {
  it('should getArtist', async () => {
    if (getArtists) {
      const response = await getArtists({}, {}, {}, {} as GraphQLResolveInfo);
      expect(response).toEqual([]);
    }
  });
});
