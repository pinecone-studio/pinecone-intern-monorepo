import { getTicket } from 'apps/L1FG/concert-ticket/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/ticket.model.ts', () => ({
  TicketModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({ _id: '60d5f9b4f1e2b1c1f8b4567a', concertID: '60d5f9b4f1e2b1c1f8b4567a', ticketNumber: 1, vipTicket: 12, standartTicket: 12, standingAreaTicket: 12 })
      .mockResolvedValueOnce(null),
  },
}));
describe('get ticket', () => {
  it(' should get ticket', async () => {
    expect(await getTicket!({}, { ticketNumber: 1 }, {}, {} as GraphQLResolveInfo)).toEqual({
      _id: '60d5f9b4f1e2b1c1f8b4567a',
      concertID: '60d5f9b4f1e2b1c1f8b4567a',
      ticketNumber: 1,
      vipTicket: 12,
      standartTicket: 12,
      standingAreaTicket: 12,
    });
  });
  it('not found ticket', async () => {
    await expect(getTicket!({}, { ticketNumber: 2 }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new Error('Тасалбар олдсонгүй'));
  });
});
