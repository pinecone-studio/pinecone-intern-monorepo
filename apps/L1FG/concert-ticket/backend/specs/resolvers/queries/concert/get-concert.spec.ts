import { getConcert } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models', () => ({
  ConcertModel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        _id: '1',
        concertName: '',
        concertPlan: '',
        artistName: [],
        concertDay: '',
        concertTime: '',
        concertPhoto: '',
        vipTicket: { price: 2, quantity: 2 },
        regularTicket: { price: 2, quantity: 2 },
        standingAreaTicket: { price: 2, quantity: 2 },
      }),
  },
}));
describe('getconcert', () => {
  it('not found concert', async () => {
    await expect(getConcert!({}, { _id: 'not found' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Тоглолт байхгүй байна');
  });
  it('should get concert', async () => {
    const result = await getConcert!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      concertName: '',
      concertPlan: '',
      artistName: [],
      concertDay: '',
      concertTime: '',
      concertPhoto: '',
      vipTicket: { price: 2, quantity: 2 },
      regularTicket: { price: 2, quantity: 2 },
      standingAreaTicket: { price: 2, quantity: 2 },
    });
  });
});
