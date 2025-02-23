import { TicketModel } from 'apps/L1FG/concert-ticket/backend/src/models';
import { deleteTicket } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/ticket.model.ts', () => ({
  TicketModel: {
    findByIdAndDelete: jest
      .fn()
      .mockResolvedValueOnce({ _id: '60d5f9b4f1e2b1c1f8b4567a', concertID: '6787a8156ba06ccedf49495c', ticketNumber: 12, vipTicket: 12, standartTicket: 12, standingAreaTicket: 12 })
      .mockResolvedValueOnce(null),
  },
}));

describe('delete ticket', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('1. successfull deleted ticket id', async () => {
    const result = await deleteTicket!({}, { ticketID: '60d5f9b4f1e2b1c1f8b4567a' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({ _id: '60d5f9b4f1e2b1c1f8b4567a', concertID: '6787a8156ba06ccedf49495c', ticketNumber: 12, vipTicket: 12, standartTicket: 12, standingAreaTicket: 12 });
    expect(TicketModel.findByIdAndDelete).toHaveBeenCalledWith({ _id: '60d5f9b4f1e2b1c1f8b4567a' });
  });

  it('2. dont delete ticket id ', async () => {
    await expect(deleteTicket!({}, { ticketID: '20d5f9b4f1e2b1c1f8b4567a' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new Error('Концерт байхгүй байна'));
    expect(TicketModel.findByIdAndDelete).toHaveBeenCalledWith({ _id: '20d5f9b4f1e2b1c1f8b4567a' });
  });
});
