import { getBookingById } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    find: jest
      .fn()
      .mockReturnValueOnce({
        populate: jest.fn().mockResolvedValue([
          {
            _id: '2',
            roomId: '2',
            firstName: 'test',
            lastName: 'test',
            email: 'test@gmail.com',
            phoneNumber: '99990909',
            status: 'booked',
            checkIn: '2024.12.05',
            checkOut: '2024.12.06',
            traveller: 2,
            toObject: jest.fn().mockReturnValue({
              _id: '2',
              roomId: '2',
              firstName: 'test',
              lastName: 'test',
              email: 'test@gmail.com',
              phoneNumber: '99990909',
              status: 'booked',
              checkIn: '2024.12.05',
              checkOut: '2024.12.06',
              traveller: 2,
            }),
          },
        ]),
      })
  },
}));

describe('getAllBookings', () => {
  it('should get all bookings successfully', async () => {
    const result = await getBookingById!({}, { _id: '2' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        _id: '2',
        roomId: '2',
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        phoneNumber: '99990909',
        status: 'booked',
        checkIn: '2024.12.05',
        checkOut: '2024.12.06',
        traveller: 2,
      },
    ]);
  });
});
