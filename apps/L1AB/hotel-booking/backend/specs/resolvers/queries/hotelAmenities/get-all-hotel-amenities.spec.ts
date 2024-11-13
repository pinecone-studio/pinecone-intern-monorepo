import { getAllHotelAmenities } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries/hotel-amenities/get-all-hotel-amenities';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelAmenitiesModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce({ _id: '2', amenities: ['1', '2'] })
      .mockRejectedValueOnce(''),
  },
}));

describe('get all hotel amenities', () => {
  it('should get all hotel amenities succesfully', async () => {
    const result = await getAllHotelAmenities!({}, {}, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '2', amenities: ['1', '2'] });
  });

  it('should return error', async () => {
    try {
      await getAllHotelAmenities!({}, {}, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to get all hotel amenities');
      }
    }
  });
});
