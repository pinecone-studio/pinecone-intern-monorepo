import { createBooking } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    create: jest.fn().mockResolvedValue({
      bankName: 'golomt',
      bankAccount: 11,
      eventId: '222',
      userId: 'dfff',
      status: 'Баталгаажаагүй',
      amountTotal: 100000,
      phone: '99999999',
      email: 'user@example.com',
      selectedDate: '2024-12-01',
      venues: [
        {
          name: 'VIP Section',
          quantity: 2,
          price: 50000,
          firstquantity:1000
        },
      ],
    }),
  },
}));

describe('createCancel', () => {
  it('should create cancel booking', async () => {
    const bookingData = {
      input: {
        bankName: 'golomt',
        bankAccount: 11,
        eventId: '222',
        userId: 'dfff',
        status: 'Баталгаажаагүй',
        amountTotal: 100000,
        phone: '99999999',
        email: 'user@example.com',
        selectedDate: '2024-12-01',
        venues: [
          {
            name: 'VIP Section',
            quantity: 2,
            price: 50000,
            firstquantity:1000
          },
        ],
      },
    };

    const res = await createBooking!({}, bookingData, { userId: 'id' }, {} as GraphQLResolveInfo);
    expect(res).toEqual({
      bankName: 'golomt',
      bankAccount: 11,
      eventId: '222',
      userId: 'dfff',
      status: 'Баталгаажаагүй',
      amountTotal: 100000,
      phone: '99999999',
      email: 'user@example.com',
      selectedDate: '2024-12-01',
      venues: [
        {
          name: 'VIP Section',
          quantity: 2,
          price: 50000,
          firstquantity:1000
        },
      ],
    });
  });
});
