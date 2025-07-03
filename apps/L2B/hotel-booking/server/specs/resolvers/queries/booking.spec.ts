const mockBookingModel = {
  find: jest.fn(),
  findById: jest.fn(),
};

jest.mock('../../../src/models', () => ({
  bookingModel: mockBookingModel,
}));

import { GraphQLResolveInfo } from 'graphql';
import { booking, bookings, pastBookings, upcomingBookings } from '../../../src/resolvers/queries/booking';

describe('Booking Query Resolvers', () => {
  const info = {} as GraphQLResolveInfo;
  const mockBooking = {
    _id: 'booking1',
    userId: { _id: 'user1', name: 'Test User' },
    hotelId: { _id: 'hotel1', name: 'Test Hotel' },
    roomId: { _id: 'room1', name: 'Test Room' },
    checkInDate: new Date('2023-12-01'),
    checkOutDate: new Date('2023-12-05'),
    totalPrice: 500,
    status: 'booked',
  };

  const createMockQuery = (resolveValue: any) => ({
    populate: jest.fn().mockReturnThis(),
    then: jest.fn((resolve) => resolve(resolveValue)),
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-11-01'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('bookings', () => {
    it('should return all bookings with populated fields', async () => {
      const mockQuery = createMockQuery([mockBooking]);
      mockBookingModel.find.mockReturnValueOnce(mockQuery);

      const result = await bookings!({}, {}, {}, info);

      expect(mockBookingModel.find).toHaveBeenCalledWith();
      expect(mockQuery.populate).toHaveBeenCalledWith('userId');
      expect(mockQuery.populate).toHaveBeenCalledWith('hotelId');
      expect(mockQuery.populate).toHaveBeenCalledWith('roomId');
      expect(result).toEqual([mockBooking]);
    });

    it('should return empty array when no bookings exist', async () => {
      const mockQuery = createMockQuery([]);
      mockBookingModel.find.mockReturnValueOnce(mockQuery);

      const result = await bookings!({}, {}, {}, info);
      expect(result).toEqual([]);
    });
  });

  describe('booking', () => {
    it('should return a booking by ID with populated fields', async () => {
      const mockQuery = createMockQuery(mockBooking);
      mockBookingModel.findById.mockReturnValueOnce(mockQuery);

      const result = await booking!({}, { id: 'booking1' }, {}, info);

      expect(mockBookingModel.findById).toHaveBeenCalledWith('booking1');
      expect(mockQuery.populate).toHaveBeenCalledWith('userId');
      expect(result).toEqual(mockBooking);
    });

    it('should throw an error if booking not found', async () => {
      const mockQuery = createMockQuery(null);
      mockBookingModel.findById.mockReturnValueOnce(mockQuery);

      await expect(booking!({}, { id: 'invalid-id' }, {}, info)).rejects.toThrow('Booking not found');
    });

    it('should throw an error if booking is undefined', async () => {
      const mockQuery = createMockQuery(undefined);
      mockBookingModel.findById.mockReturnValueOnce(mockQuery);

      await expect(booking!({}, { id: 'undefined-id' }, {}, info)).rejects.toThrow('Booking not found');
    });
  });

  describe('upcomingBookings', () => {
    it('should return upcoming bookings with populated fields', async () => {
      const mockQuery = createMockQuery([mockBooking]);
      mockBookingModel.find.mockReturnValueOnce(mockQuery);

      const result = await upcomingBookings!({}, {}, {}, info);

      const expectedDate = new Date('2023-11-01');
      expect(mockBookingModel.find).toHaveBeenCalledWith({ checkInDate: { $gte: expectedDate } });
      expect(mockQuery.populate).toHaveBeenCalledWith('userId');
      expect(result).toEqual([mockBooking]);
    });

    it('should return empty array when no upcoming bookings', async () => {
      const mockQuery = createMockQuery([]);
      mockBookingModel.find.mockReturnValueOnce(mockQuery);

      const result = await upcomingBookings!({}, {}, {}, info);
      expect(result).toEqual([]);
    });
  });

  describe('pastBookings', () => {
    it('should return past bookings for a user with populated fields', async () => {
      jest.setSystemTime(new Date('2024-01-01'));
      const mockQuery = createMockQuery([mockBooking]);
      mockBookingModel.find.mockReturnValueOnce(mockQuery);

      const result = await pastBookings!({}, { userId: 'user1' }, {}, info);

      const expectedDate = new Date('2024-01-01');
      expect(mockBookingModel.find).toHaveBeenCalledWith({
        userId: 'user1',
        checkOutDate: { $lt: expectedDate },
      });
      expect(mockQuery.populate).toHaveBeenCalledWith('userId');
      expect(result).toEqual([mockBooking]);
    });

    it('should return empty array when user has no past bookings', async () => {
      const mockQuery = createMockQuery([]);
      mockBookingModel.find.mockReturnValueOnce(mockQuery);

      const result = await pastBookings!({}, { userId: 'user-no-bookings' }, {}, info);
      expect(result).toEqual([]);
    });
  });
});
