import { getTickets } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/ticket.model.ts', () => ({
  TicketModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce({ _id: '60d5f9b4f1e2b1c1f8b4567a', concertID: '60d5f9b4f1e2b1c1f8b4567a', ticketNumber: 1, vipTicket: 12, standartTicket: 12, standingAreaTicket: 12 })
      .mockResolvedValueOnce(null),
  },
}));
describe('get tikcets', () => {
  it('should gettickets', async () => {
    expect(await getTickets!({}, {}, {}, {} as GraphQLResolveInfo)).toEqual({
      _id: '60d5f9b4f1e2b1c1f8b4567a',
      concertID: '60d5f9b4f1e2b1c1f8b4567a',
      ticketNumber: 1,
      vipTicket: 12,
      standartTicket: 12,
      standingAreaTicket: 12,
    });
  });
  it('concert not found', async () => {
    await expect(getTickets!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new Error('Тасалбар олдсонгүй'));
  });
});
