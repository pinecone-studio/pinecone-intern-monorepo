import { GraphQLResolveInfo } from 'graphql';
import { getVenues } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  VenueModel: {
    find: jest.fn().mockResolvedValue([]),
  },
}));

describe('getVenues', () => {
  it('should getVenues', async () => {
    if (getVenues) {
      const response = await getVenues({}, {}, {}, {} as GraphQLResolveInfo);
      expect(response).toEqual([]);
    }
  });
});
