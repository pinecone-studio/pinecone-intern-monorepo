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

    const populateMock3 = jest.fn().mockResolvedValueOnce(mockBooking);
    const populateMock2 = jest.fn().mockReturnValue({ populate: populateMock3 });
    const populateMock1 = jest.fn().mockReturnValue({ populate: populateMock2 });

    (bookingModel.findById as jest.Mock).mockReturnValue({ populate: populateMock1 });

    const result = await booking!({}, { id: 'abc123' }, {}, info);
    expect(bookingModel.findById).toHaveBeenCalledWith('abc123');
    expect(result).toEqual(mockBooking);
  });

  it('should throw if booking not found', async () => {
    const populateMock3 = jest.fn().mockResolvedValueOnce(null);
    const populateMock2 = jest.fn().mockReturnValue({ populate: populateMock3 });
    const populateMock1 = jest.fn().mockReturnValue({ populate: populateMock2 });

    (bookingModel.findById as jest.Mock).mockReturnValue({ populate: populateMock1 });

    await expect(booking!({}, { id: 'missing-id' }, {}, info)).rejects.toThrow('Booking not found');
  });

  it('should return upcoming bookings', async () => {
    const mockUpcoming = [{ id: 'upcoming1' }];
    (bookingModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValueOnce(mockUpcoming),
        }),
      }),
    });

    const result = await upcomingBookings!({}, {}, {}, info);
    expect(bookingModel.find).toHaveBeenCalledWith({
      checkInDate: { $gte: expect.any(Date) },
    });
    expect(result).toEqual(mockUpcoming);
  });

  it('should return past bookings for a user', async () => {
    const mockPast = [{ id: 'past1' }];
    (bookingModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValueOnce(mockPast),
      }),
    });

    const result = await pastBookings!({}, { userId: 'user123' }, {}, info);
    expect(bookingModel.find).toHaveBeenCalledWith({
      userId: 'user123',
      checkOutDate: { $lt: expect.any(Date) },
    });
    expect(result).toEqual(mockPast);
  });
});
