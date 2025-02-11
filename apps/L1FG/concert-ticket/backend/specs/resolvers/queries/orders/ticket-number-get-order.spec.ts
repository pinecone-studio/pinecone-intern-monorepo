import { getOrderTicketNumber } from 'apps/L1FG/concert-ticket/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/order.model.ts', () => ({
  OrderModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({
        userID: '6787a8066ba06ccedf49495a',
        concertID: '1',
        ticketID: '1',
        phoneNumber: 534,
        email: 'aa',
        totalPrice: 342,
        paymentType: 'fwe',
        ticketNumber: 1,
        vipTicket: {
          price: 453,
          quantity: 345,
        },
        regularTicket: {
          price: 45,
          quantity: 435,
        },
        standingAreaTicket: {
          price: 3543,
          quantity: 6456,
        },
        _id: 1,
      })
      .mockResolvedValueOnce(null),
  },
}));
jest.mock('apps/L1FG/concert-ticket/backend/src/models/ticket.model.ts', () => ({
  TicketModel: {
    findOne: jest.fn().mockReturnValueOnce({ _id: '60d5f9b4f1e2b1c1f8b4567a', concertID: '60d5f9b4f1e2b1c1f8b4567a', ticketNumber: 2, vipTicket: 12, standartTicket: 12, standingAreaTicket: 12 }),
    findOneAndDelete: jest.fn().mockReturnValueOnce({}),
  },
}));
jest.mock('apps/L1FG/concert-ticket/backend/src/models/concert.model.ts', () => ({
  ConcertModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      _id: '6787a8236ba06ccedf49495e',
      concertName: 'Bohemian Rhapsody',
      concertPlan: 'VIP',
      artistName: ['Queen'],
      concertDay: '2025-06-18T00:00:00.000Z',
      concertTime: '18:30',
      concertPhoto: '/images/queen.png',
      vipTicket: {
        price: 240000,
        quantity: 137,
      },
      regularTicket: {
        price: 115000,
        quantity: 216,
      },
      standingAreaTicket: {
        price: 58000,
        quantity: 296,
      },
    }),
  },
}));
describe('ticket number get concert', () => {
  it('find order successfull', async () => {
    expect(await getOrderTicketNumber!({}, { ticketNumber: 1 }, {}, {} as GraphQLResolveInfo)).toEqual({
      userID: '6787a8066ba06ccedf49495a',
      concertID: '1',
      ticketID: '1',
      phoneNumber: 534,
      email: 'aa',
      totalPrice: 342,
      paymentType: 'fwe',
      ticketNumber: 1,
      vipTicket: {
        price: 453,
        quantity: 345,
      },
      regularTicket: {
        price: 45,
        quantity: 435,
      },
      standingAreaTicket: {
        price: 3543,
        quantity: 6456,
      },
      _id: 1,
    });
  });
  it('not found order', async () => {
    await expect(getOrderTicketNumber!({}, { ticketNumber: 2 }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new Error('Захиалга баталгаажуулаагүй тул тасалбарыг цуцаллаа'));
  });
});
