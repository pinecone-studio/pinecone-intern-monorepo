import { hotelModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { getAllHotels } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelModel: {
    aggregate: jest
      .fn()
      .mockResolvedValueOnce([
        {
          _id: '1',
          name: 'Hotel One',
          rooms: [{ _id: 'room1' }],
          hotelAmenities: [
            {
              amenities: [
                { _id: 'amenity1', name: 'WiFi' },
                { _id: 'amenity2', name: 'Pool' },
              ],
            },
          ],
        },
        {
          _id: '2',
          name: 'Hotel Two',
          rooms: [],
          hotelAmenities: [],
        },
      ])
      .mockRejectedValueOnce(new Error('Aggregation error')),
  },
}));

describe('getAllHotels', () => {
  it('should get all hotels successfully and transform hotel amenities correctly', async () => {
    const result = await getAllHotels!({}, {}, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual([
      {
        _id: '1',
        name: 'Hotel One',
        rooms: [{ _id: 'room1' }],
        hotelAmenities: {
          amenities: [
            { _id: 'amenity1', name: 'WiFi' },
            { _id: 'amenity2', name: 'Pool' },
          ],
        },
      },
      {
        _id: '2',
        name: 'Hotel Two',
        rooms: [],
        hotelAmenities: null,
      },
    ]);

    expect(jest.mocked(hotelModel.aggregate)).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when aggregation fails', async () => {
    try {
      await getAllHotels!({}, {}, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to get all hotels'));
    }

    expect(jest.mocked(hotelModel.aggregate)).toHaveBeenCalledTimes(2);
  });
});
