import { deleteConcert } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/concert.model.ts', () => ({
  ConcertModel: {
    findByIdAndDelete: jest
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
  },
}));

describe('delete order', () => {
  it('should render delete order', async () => {
    const result = await deleteConcert!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
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
  it('should render delete order', async () => {
    expect(deleteConcert!({}, { _id: 'wrong' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new Error('Концерт олдсонгүй'));
  });
});
