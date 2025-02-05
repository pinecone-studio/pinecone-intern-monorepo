import { getOrders } from 'apps/L1FG/concert-ticket/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/order.model.ts', () => ({
  OrderModel: {
    find: jest.fn().mockReturnValue({
      userID: '6787a8066ba06ccedf49495a',
      concertID: '1',
      ticketID: '1',
      phoneNumber: 534,
      email: 'aa',
      totalPrice: 342,
      paymentType: 'fwe',
      ticketNumber: 45,
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
    }),
  },
}));
describe('get orders', () => {
  it('should get order', async () => {
    expect(await getOrders!({}, {}, {}, {} as GraphQLResolveInfo)).toEqual({
      userID: '6787a8066ba06ccedf49495a',
      concertID: '1',
      ticketID: '1',
      phoneNumber: 534,
      email: 'aa',
      totalPrice: 342,
      paymentType: 'fwe',
      ticketNumber: 45,
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
});
