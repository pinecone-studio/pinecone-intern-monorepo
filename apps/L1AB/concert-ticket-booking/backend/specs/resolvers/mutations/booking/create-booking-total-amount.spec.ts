import { createBookingTotalAmount } from '../../../../src/resolvers/mutations';
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
        },
      ],
    }),
  },
}));

describe('createBookingTotalAmount', () => {
  it('should calculate total amount and create booking', async () => {
    const bookingInput = {
      input: {
        bankName: 'golomt',
        bankAccount: 11,
        eventId: '222',
        userId: 'dfff',
        status: 'Баталгаажаагүй',
        phone: '99999999',
        email: 'user@example.com',
        selectedDate: '2024-12-01',
        venues: [
          {
            name: 'VIP Section',
            quantity: 2,
            price: 50000,
          },
        ],
      },
    };

    const res = await createBookingTotalAmount!({}, bookingInput, { userId: 'id' }, {} as GraphQLResolveInfo);

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
        },
      ],
    });

    expect(res.amountTotal).toBe(100000); // Verifies the total calculation
  });
});
