import { getAllBookings } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue([
        { 
          _id: '1', 
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
            _id: '1',
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
        {
          _id: '2',
          roomId: '2',
          firstName: 'test2',
          lastName: 'test2',
          email: 'test2@gmail.com',
          phoneNumber: '99990909',
          status: 'completed',
          checkIn: '2024.12.05',
          checkOut: '2024.12.06',
          traveller: 2,
          toObject: jest.fn().mockReturnValue({
            _id: '2',
            roomId: '2',
            firstName: 'test2',
            lastName: 'test2',
            email: 'test2@gmail.com',
            phoneNumber: '99990909',
            status: 'completed',
            checkIn: '2024.12.05',
            checkOut: '2024.12.06',
            traveller: 2,
          }),
        },
      ]),
    }),
  },
}));

describe('getAllBookings', () => {
  it('should get all bookings successfully', async () => {
    const result = await getAllBookings!({}, {}, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        _id: '1',
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
      {
        _id: '2',
        roomId: '2',
        firstName: 'test2',
        lastName: 'test2',
        email: 'test2@gmail.com',
        phoneNumber: '99990909',
        status: 'completed',
        checkIn: '2024.12.05',
        checkOut: '2024.12.06',
        traveller: 2,
      },
    ]);
  });
});
