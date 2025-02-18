import { deleteOrder } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models', () => ({
  OrderModel: {
    findByIdAndDelete: jest.fn().mockResolvedValueOnce({
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
    }),
  },
}));

describe('delete order', () => {
  it('should render delete order', async () => {
    const result = await deleteOrder!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
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
    });
  });
});
