import { createBooking } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        roomId: '2',
        userId: '2',
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        phoneNumber: '99990909',
        status: 'booked',
        checkIn: '2024.12.05',
        checkOut: '2024.12.06',
        traveller: 2,
      })
      .mockRejectedValueOnce({}),
  },
}));

describe('create booking', () => {
  const mockInput = {
    _id: '1',
    roomId: '2',
    userId: '2',
    firstName: 'test',
    lastName: 'test',
    email: 'test@gmail.com',
    phoneNumber: '99990909',
    status: 'booked',
    checkIn: '2024.12.05',
    checkOut: '2024.12.06',
    traveller: 2,
  };
  it('should successfully create booking', async () => {
    const result = await createBooking!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ success: true, message: 'Successfully created booking' });
  });

  it('should unsuccessfully create booking', async () => {
    const result = await createBooking!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ success: false, message: 'Failed to create booking' });
  });
});
