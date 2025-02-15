import { getBookingsByUserId } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries';
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
    if (!getBookingsByUserId) {
      throw new Error('getBookingsByUserId is not defined');
    }
    const response = await getBookingsByUserId({}, { userId: '678a1e86e77cd867f0910173' }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockBookings);
  });
  it('should throw null because bookings not found', async () => {
    if (!getBookingsByUserId) {
      throw new Error('getBookingsByUserId is not defined');
    }
    const response = await getBookingsByUserId({}, { userId: '6786c58b136cec130f8d1d3b' }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });
  it('should throw error of invalid objectId error', async () => {
    try {
      if (!getBookingsByUserId) {
        throw new Error('getBookingsByUserId is not defined');
      }
      await getBookingsByUserId({}, { userId: 'Invalid id hhe' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid ID format'));
    }
  });
});
