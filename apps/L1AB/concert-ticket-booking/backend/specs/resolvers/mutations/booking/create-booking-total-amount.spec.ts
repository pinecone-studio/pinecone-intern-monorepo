import { createBookingTotalAmount } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    create: jest.fn().mockImplementation((data) => {
      const venues = data?.input?.venues || [];

      type Venue = { quantity: number; price: number };

      if (venues.length > 0) {
        const amountTotal = venues.reduce((total: number, venue: Venue) => total + venue.quantity * venue.price, 0);

        return Promise.resolve({
          bankName: 'golomt',
          bankAccount: 11,
          eventId: '222',
          userId: 'dfff',
          status: 'Баталгаажаагүй',
          amountTotal,
          phone: '99999999',
          email: 'user@example.com',
          selectedDate: '2024-12-01',
          venues,
        });
      }

      return Promise.resolve({
        bankName: 'golomt',
        bankAccount: 11,
        eventId: '222',
        userId: 'dfff',
        status: 'Баталгаажаагүй',
        amountTotal: 0,
        phone: '99999999',
        email: 'user@example.com',
        selectedDate: '2024-12-01',
        venues: [],
      });
    }),
  },
}));

describe('createBookingTotalAmount', () => {
  it('should calculate total amount and create booking when venues are provided', async () => {
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

    expect(res.bankName).toEqual('golomt');

    expect(res.amountTotal).toBe(0);
  });

  it('should handle undefined venues gracefully and return correct total', async () => {
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
        venues: undefined,
      },
    };

    const res = await createBookingTotalAmount!({}, bookingInput, { userId: 'id' }, {} as GraphQLResolveInfo);

    expect(res.bankName).toEqual('golomt');
    expect(res.amountTotal).toBe(0);
    expect(res.venues).toEqual([]);
  });

  it('should handle empty venues array and return correct total', async () => {
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
        venues: [],
      },
    };

    const res = await createBookingTotalAmount!({}, bookingInput, { userId: 'id' }, {} as GraphQLResolveInfo);

    expect(res.bankName).toEqual('golomt');
    expect(res.amountTotal).toBe(0);
    expect(res.venues).toEqual([]);
  });
});
