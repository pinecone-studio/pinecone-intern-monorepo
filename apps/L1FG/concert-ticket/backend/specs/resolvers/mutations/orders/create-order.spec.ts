import { createOrder } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models', () => ({
  OrderModel: {
    create: jest.fn().mockReturnValueOnce({
      concertID: 'id',
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
    }),
  },
}));

describe('createOrder', () => {
  it('should render create order', async () => {
    const regularTicket = {
      price: 1,
      quantity: 1,
    };
    const standingAreaTicket = {
      price: 1,
      quantity: 1,
    };
    const vipTicket = {
      price: 1,
      quantity: 1,
    };
    const result = await createOrder!(
      {},
      {
        input: {
          concertID: 'id',
          email: 'email',
          paymentType: 'payment',
          phoneNumber: 4534,
          regularTicket: regularTicket,
          standingAreaTicket: standingAreaTicket,
          vipTicket: vipTicket,
          ticketID: 'id',
          ticketNumber: 45,
          totalPrice: 45,
          userID: 'id',
          orderStatus: 'DONE',
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual({
      concertID: 'id',
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
    });
  });
});
