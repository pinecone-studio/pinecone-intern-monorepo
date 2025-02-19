import { deleteOrder } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/order.model.ts', () => ({
  OrderModel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce({
        _id: 1,
        concertID: '1',
        email: 'email',
        paymentType: 'payment',
        phoneNumber: 4534,
        regularTicket: {},
        standingAreaTicket: {},
        vipTicket: {},
        ticketID: 'id',
        ticketNumber: 45,
        totalPrice: 45,
        userID: 'id',
        orderStatus: 'DONE',
      })
      .mockResolvedValueOnce(null),
    findByIdAndDelete: jest.fn().mockResolvedValueOnce({}),
  },
}));
jest.mock('apps/L1FG/concert-ticket/backend/src/models/ticket.model.ts', () => ({
  TicketModel: {
    findOne: jest.fn().mockResolvedValueOnce({ _id: '1', concertID: '1', ticketNumber: 12, vipTicket: 12, standartTicket: 12, standingAreaTicket: 12 }),
    findOneAndDelete: jest.fn().mockResolvedValueOnce({
      _id: 1,
      concertName: 'mm',
      concertPlan: 'dv',
      artistName: ['dfsvsdv'],
      concertDay: 436,
      concertTime: 'fdg',
      concertPhoto: 'fsg',
      vipTicket: {},
      regularTicket: {},
      standingAreaTicket: {},
    }),
  },
}));

jest.mock('apps/L1FG/concert-ticket/backend/src/models/concert.model.ts', () => ({
  ConcertModel: { findByIdAndUpdate: jest.fn().mockResolvedValueOnce({}) },
}));
describe('delete order', () => {
  it('should render delete order', async () => {
    const result = await deleteOrder!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({});
  });
  it('should render delete order feild', async () => {
    await expect(deleteOrder!({}, { id: 'wrong' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new Error('concert not found'));
  });
});
