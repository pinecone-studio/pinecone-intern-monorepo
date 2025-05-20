import { GraphQLResolveInfo } from 'graphql';
import { bookingModel } from '../../../src/models';
import { booking, bookings, pastBookings, upcomingBookings } from '../../../src/resolvers/queries';

jest.mock('../../../src/models', () => ({
  bookingModel: {
    find: jest.fn(),
    findById: jest.fn(),
  },
}));

describe('Booking Query Resolvers', () => {
  const info = {} as GraphQLResolveInfo;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all bookings', async () => {
    const mockBookings = [{ id: '1' }, { id: '2' }];
    (bookingModel.find as jest.Mock).mockResolvedValueOnce(mockBookings);

    const result = await bookings!({}, {}, {}, info);
    expect(bookingModel.find).toHaveBeenCalledWith({});
    expect(result).toEqual(mockBookings);
  });

  it('should return a booking by ID', async () => {
    const mockBooking = { id: 'abc123', name: 'Test Booking' };
    (bookingModel.findById as jest.Mock).mockResolvedValueOnce(mockBooking);

    const result = await booking!({}, { id: 'abc123' }, {}, info);
    expect(bookingModel.findById).toHaveBeenCalledWith('abc123');
    expect(result).toEqual(mockBooking);
  });

  it('should throw if booking not found', async () => {
    (bookingModel.findById as jest.Mock).mockResolvedValueOnce(null);

    await expect(booking!({}, { id: 'missing-id' }, {}, info)).rejects.toThrow('Booking not found');
  });

  it('should return upcoming bookings', async () => {
    const mockUpcoming = [{ id: 'upcoming1' }];
    (bookingModel.find as jest.Mock).mockResolvedValueOnce(mockUpcoming);

    const result = await upcomingBookings!({}, {}, {}, info);
    expect(bookingModel.find).toHaveBeenCalledWith({
      checkInDate: { $gte: expect.any(Date) },
    });
    expect(result).toEqual(mockUpcoming);
  });

  it('should return past bookings for a user', async () => {
    const mockPast = [{ id: 'past1' }];
    const userId = 'user123';
    (bookingModel.find as jest.Mock).mockResolvedValueOnce(mockPast);

    const result = await pastBookings!({}, { userId }, {}, info);
    expect(bookingModel.find).toHaveBeenCalledWith({
      userId,
      checkOutDate: { $lt: expect.any(Date) },
    });
    expect(result).toEqual(mockPast);
  });
});
