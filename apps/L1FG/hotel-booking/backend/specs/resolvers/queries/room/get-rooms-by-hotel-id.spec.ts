import { GraphQLResolveInfo } from 'graphql';
import { getRoomsByHotelId } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  RoomModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce([{ _id: '' }])
      .mockResolvedValueOnce([]),
  },
}));
describe('getRoomsByHotelId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should get rooms', async () => {
    const mockRooms = [
      {
        _id: '',
      },
    ];

    if (!getRoomsByHotelId) {
      throw new Error('getRoomsByHotelId is not defined');
    }

    const response = await getRoomsByHotelId({}, { hotelId: '678ccc1ba4e7125effcba05e' }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockRooms);
  });
  it('should throw null because rooms not found', async () => {
    const response = await getRoomsByHotelId!({}, { hotelId: '6786c58b136cec130f8d1d3b' }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual([]);
  });
  it('should throw error of invalid objectId error', async () => {
    try {
      if (!getRoomsByHotelId) {
        throw new Error('getRoomsByHotelId is not defined');
      }
      await getRoomsByHotelId({}, { hotelId: 'Invalid id hhe' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid ID format'));
    }
  });
});
