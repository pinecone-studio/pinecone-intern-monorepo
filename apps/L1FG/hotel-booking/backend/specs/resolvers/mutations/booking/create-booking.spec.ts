import { GraphQLResolveInfo } from 'graphql';
import { createBooking } from '../../../../src/resolvers/mutations/booking/create-booking';
import { CreateBookingInput } from 'apps/L1FG/hotel-booking/backend/src/generated';
import { BookingModel } from '../../../../src/models';

const booking: CreateBookingInput = {
  userId: 'user123',
  hotelId: 'hotel123',
  roomId: 'room123',
  startDate: '2025-01-01',
  endDate: '2025-01-07',
  phoneNumber: '123-456-7890',
  guestRequest: ' Nothing',
  email: 'test@example.com',
  status: 'pending',
  cardName: 'John Doe',
  cardNumber: '4111111111111111',
  expirationDate: '12/2025',
  securityCode: 123,
  country: 'USA',
};

jest.mock('../../../../src/models', () => ({
  BookingModel: {
    create: jest.fn(),
  },
}));

describe('createBooking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error response if BookingModel.create fails', async () => {
    (BookingModel.create as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    const response = await createBooking!({}, { input: booking }, {}, {} as GraphQLResolveInfo);

    expect(response.code).toBe(500);
    expect(response.success).toBe(false);
    expect(response.message).toBe('Failed to create booking');
    expect(response.booking).toBeUndefined();
  });

  it('should create a booking successfully', async () => {
    (BookingModel.create as jest.Mock).mockResolvedValueOnce({
      userId: 'user123',
      hotelId: 'hotel123',
      roomId: 'room123',
      startDate: '2025-01-01',
      endDate: '2025-01-07',
      phoneNumber: '123-456-7890',
      guestRequest: 'Nothing',
      email: 'test@example.com',
      status: 'pending',
      cardName: 'John Doe',
      cardNumber: '4111111111111111',
      expirationDate: '12/2025',
      securityCode: 123,
      country: 'USA',
    });

    const response = await createBooking!({}, { input: booking }, {}, {} as GraphQLResolveInfo);

    expect(response.code).toBe(200);
    expect(response.success).toBe(true);
    expect(response.message).toBe('Booking created successfully');
    expect(response.booking?.userId).toBe('user123');
    expect(response.booking?.guestRequest).toEqual([
      { key: 'Special Request', value: 'Extra towels' },
      { key: 'Late Check-In', value: 'After 10 PM' },
    ]);
    expect(response.booking?.status).toEqual([
      { key: 'Payment Status', value: 'Paid' },
      { key: 'Reservation Status', value: 'Confirmed' },
    ]);
  });
});
