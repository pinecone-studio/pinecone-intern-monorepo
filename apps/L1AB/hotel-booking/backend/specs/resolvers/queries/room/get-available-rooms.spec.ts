import { bookingModel, roomModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { getAvailableRooms } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    find: jest.fn(),
  },
  roomModel: {
    find: jest.fn(),
  },
}));

describe('Get available rooms', () => {
  it('should get successfully', async () => {
    const mockDateRange = {
      checkIn: new Date('2024-12-20'),
      checkOut: new Date('2024-12-25'),
    };
    const traveler = 2;

    jest.mocked(roomModel.find).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce([
        {
          toObject: jest.fn().mockReturnValue({ _id: '2', hotelId: '1', maxCapacity: 3 }),
        },
      ]),
    } as any);

    jest.mocked(bookingModel.find).mockResolvedValueOnce([]);

    const result = await getAvailableRooms!({}, { dateRange: mockDateRange, traveler }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual([{ _id: '2', hotelId: '1', maxCapacity: 3 }]);
  });

  it('should throw an error when travelers exceed the maximum room capacity available', async () => {
    const mockDateRange = {
      checkIn: new Date('2024-12-25'),
      checkOut: new Date('2024-12-26'),
    };
    const traveler = 10;

    jest.mocked(roomModel.find).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce([
        {
          toObject: jest.fn().mockReturnValue({ _id: '2', hotelId: '1', maxCapacity: 5 }),
        },
      ]),
    } as any);

    jest.mocked(bookingModel.find).mockResolvedValueOnce([]);

    await expect(getAvailableRooms!({}, { dateRange: mockDateRange, traveler }, {} as any, {} as GraphQLResolveInfo))
      .rejects.toThrow('Number of travelers exceeds the maximum room capacity available.');
  });

  it('should return only available rooms when some rooms are booked', async () => {
    const mockDateRange = {
      checkIn: new Date('2024-12-20'),
      checkOut: new Date('2024-12-25'),
    };
    const traveler = 2;

    jest.mocked(roomModel.find).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce([
        { toObject: jest.fn().mockReturnValue({ _id: '1', hotelId: '1', maxCapacity: 3 }) },
        { toObject: jest.fn().mockReturnValue({ _id: '2', hotelId: '1', maxCapacity: 3 }) },
      ]),
    } as any);

    jest.mocked(bookingModel.find).mockResolvedValueOnce([{ roomId: '1', checkIn: '2024-12-20', checkOut: '2024-12-22' }]);

    const result = await getAvailableRooms!({}, { dateRange: mockDateRange, traveler }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual([{ _id: '2', hotelId: '1', maxCapacity: 3 }]);
  });

  it('should return a room when the number of travelers matches the maximum capacity', async () => {
    const mockDateRange = {
      checkIn: new Date('2024-12-20'),
      checkOut: new Date('2024-12-25'),
    };
    const traveler = 3;

    jest.mocked(roomModel.find).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce([
        { toObject: jest.fn().mockReturnValue({ _id: '1', hotelId: '1', maxCapacity: 3 }) },
      ]),
    } as any);

    jest.mocked(bookingModel.find).mockResolvedValueOnce([]);

    const result = await getAvailableRooms!({}, { dateRange: mockDateRange, traveler }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual([{ _id: '1', hotelId: '1', maxCapacity: 3 }]);
  });
});
