import { ConcertModel } from 'apps/L1FG/concert-ticket/backend/src/models';
import { getConcerts } from 'apps/L1FG/concert-ticket/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('.../../../../src/models', () => ({
  ConcertModel: { find: jest.fn().mockReturnValue({ sort: jest.fn().mockResolvedValue([]) }) },
}));
describe('get concerts', () => {
  it('should get concerts', async () => {
    const result = await getConcerts!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(ConcertModel.find).toHaveBeenCalled();
    expect(ConcertModel.find().sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(result).toEqual([]);
  });
});
