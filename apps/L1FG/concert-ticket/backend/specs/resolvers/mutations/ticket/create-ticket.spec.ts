import { createTicket } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/ticket.model.ts', () => ({
  TicketModel: {
    create: jest.fn().mockReturnValueOnce({ _id: '60d5f9b4f1e2b1c1f8b4567a', concertID: '60d5f9b4f1e2b1c1f8b4567a', ticketNumber: 12, vipTicket: 12, standartTicket: 12, standingAreaTicket: 12 }),
  },
}));

describe('create ticket', () => {
  it('render create ticket', async () => {
    const result = await createTicket!(
      {},
      {
        input: {
          concertID: '60d5f9b4f1e2b1c1f8b4567a',
          standartTicket: 12,
          standingAreaTicket: 12,
          ticketNumber: 12,
          vipTicket: 12,
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual({ _id: '60d5f9b4f1e2b1c1f8b4567a', concertID: '60d5f9b4f1e2b1c1f8b4567a', ticketNumber: 12, vipTicket: 12, standartTicket: 12, standingAreaTicket: 12 });
  });
});
