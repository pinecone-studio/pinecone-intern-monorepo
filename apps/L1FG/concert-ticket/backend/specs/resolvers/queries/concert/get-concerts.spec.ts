import { getConcerts } from 'apps/L1FG/concert-ticket/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('.../../../../src/models', () => ({
  ConcertModel: { find: jest.fn().mockResolvedValue([]) },
}));
describe('get concerts', () => {
  it('should get concerts', async () => {
    const result = await getConcerts!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual([]);
  });
});
