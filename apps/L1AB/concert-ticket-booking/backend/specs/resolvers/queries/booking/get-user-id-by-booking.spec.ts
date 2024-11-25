import { getBookingByUserId } from '../../../../src/resolvers/queries/booking';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    find: jest.fn().mockReturnValue({
      populate: jest
        .fn()
        .mockResolvedValueOnce([
          {
            _id: '1',
            userId: 'user123',
            eventId: 'event456',
            status: 'confirmed',
            amountTotal: 500,
          },
          {
            _id: '2',
            userId: 'user123',
            eventId: 'event789',
            status: 'pending',
            amountTotal: 300,
          },
        ])
        .mockResolvedValueOnce([]), // For the second test case
    }),
  },
}));

describe('getBookingByUserId', () => {
  it('should return all bookings for a given user', async () => {
    const userId = 'user123';

    const bookings = await getBookingByUserId!({}, { userId }, {}, {} as GraphQLResolveInfo);

    expect(bookings).toEqual([
      {
        _id: '1',
        userId: 'user123',
        eventId: 'event456',
        status: 'confirmed',
        amountTotal: 500,
      },
      {
        _id: '2',
        userId: 'user123',
        eventId: 'event789',
        status: 'pending',
        amountTotal: 300,
      },
    ]);
  });

  it('should throw an error if event not found', async () => {
    try {
      await getBookingByUserId!({}, { userId: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('No bookings found for this user'));
    }
  });
});
