import { GraphQLResolveInfo } from 'graphql';
import { bookingModel } from '../../../src/models';
import { createBooking, updateBookingStatus } from '../../../src/resolvers/mutations';
import { BookingInput, BookingStatus, MutationCreateBookingArgs, MutationUpdateBookingStatusArgs } from '../../../src/generated';

jest.mock('../../../src/models', () => ({
  bookingModel: {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('Booking Mutation Resolvers', () => {
  const info = {} as GraphQLResolveInfo;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a booking', async () => {
    const input: BookingInput = {
      userId: '682207ae2c5870fba2e6da4c',
      hotelId: '682b22e10a3e9410e2ef5d77',
      roomId: '682c01940170a479a6bc9907',
      guests: { adults: 1, children: 0 },
      checkInDate: '2026-12-03T00:00:00.000Z',
      checkOutDate: '2026-12-05T00:00:00.000Z',
      roomNumber: '101',
      totalPrice: 100,
      images: ['asdfg'],
    };

    const mockCreated = { ...input, status: 'booked' as BookingStatus, id: 'booking1' };

    (bookingModel.create as jest.Mock).mockResolvedValueOnce(mockCreated);

    const args: MutationCreateBookingArgs = { input };
    const result = await createBooking!({}, args, {}, info);

    expect(bookingModel.create).toHaveBeenCalledWith({ ...input, status: 'booked' });
    expect(result).toEqual(mockCreated);
  });

  it('should throw error if booking creation fails', async () => {
    (bookingModel.create as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

    const args: MutationCreateBookingArgs = {
      input: {
        userId: 'fail',
        hotelId: 'fail',
        roomId: 'fail',
        guests: { adults: 1, children: 0 },
        checkInDate: '2025-01-01T00:00:00.000Z',
        checkOutDate: '2025-01-02T00:00:00.000Z',
        roomNumber: '0',
        totalPrice: 0,
        images: [],
      },
    };

    await expect(createBooking!({}, args, {}, info)).rejects.toThrow('Booking creation failed');
  });

  it('should update booking status', async () => {
    const updatedBooking = { id: '123', status: BookingStatus.Cancelled };
    (bookingModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedBooking);

    const args: MutationUpdateBookingStatusArgs = { id: '123', status: BookingStatus.Cancelled };
    const result = await updateBookingStatus!({}, args, {}, info);

    expect(bookingModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { status: BookingStatus.Cancelled }, { new: true });
    expect(result).toEqual(updatedBooking);
  });

  it('should throw error if status update fails', async () => {
    (bookingModel.findByIdAndUpdate as jest.Mock).mockRejectedValueOnce(new Error('Update failed'));

    const args: MutationUpdateBookingStatusArgs = { id: 'fail', status: BookingStatus.Cancelled };
    await expect(updateBookingStatus!({}, args, {}, info)).rejects.toThrow('Failed to update booking status');
  });
});
