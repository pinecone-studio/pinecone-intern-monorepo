import { getBookingByUserId } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';
import { Types } from 'mongoose';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue([
        {
          _id: '1',
          userId: 'user1',
          roomId: '2',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '999909090',
          status: 'booked',
          checkIn: '2024-12-05',
          checkOut: '2024-12-06',
          traveller: 2,
          toObject: jest.fn().mockReturnValue({
            _id: '1',
            userId: 'user1',
            roomId: '2',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '999909090',
            status: 'booked',
            checkIn: '2024-12-05',
            checkOut: '2024-12-06',
            traveller: 2,
          }),
        },
      ]),
    }),
  },
}));

describe('getBookingByUserId', () => {
  it('should throw an error if userId is invalid', async () => {
    const invalidUserId = 'invalidUserId';
    try {
      await getBookingByUserId!({}, { _id: invalidUserId }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid User ID'));
    }
  });
  it('should get bookings by userId successfully', async () => {
    const validUserId = new Types.ObjectId().toString();
    const result = await getBookingByUserId!({}, { _id: validUserId }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual([
      {
        _id: '1',
        userId: 'user1',
        roomId: '2',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '999909090',
        status: 'booked',
        checkIn: '2024-12-05',
        checkOut: '2024-12-06',
        traveller: 2,
      },
    ]);
  });
});
