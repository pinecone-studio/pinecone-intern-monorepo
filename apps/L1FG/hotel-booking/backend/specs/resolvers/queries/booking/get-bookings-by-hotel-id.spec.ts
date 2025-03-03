import { getBookingsByHotelId } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  BookingModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce([{ _id: '' }])
      .mockResolvedValueOnce([]),
  },
}));
describe('getBookingsByUserId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should get bookings', async () => {
    const mockBookings = [
      {
        _id: '',
      },
    ];
    const response = await getBookingsByHotelId!({}, { hotelId: '678cc7f6a4e7125effcba04c' }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockBookings);
  });
  it('should throw null because bookings not found', async () => {
    const response = await getBookingsByHotelId!({}, { hotelId: '6786c58b136cec130f8d1d3b' }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });
  it('should throw error of invalid objectId error', async () => {
    try {
      await getBookingsByHotelId!({}, { hotelId: 'Invalid id hhe' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid ID format'));
    }
  });
});
