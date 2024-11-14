import { getHotelAmenityById } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries/hotel-amenities/get-hotel-amenity-by-id';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelAmenitiesModel: {
    findById: jest.fn().mockResolvedValueOnce({ _id: '2' }).mockRejectedValueOnce(''),
  },
}));

describe('get hotel amenity', () => {
  it('should get hotel amenity succesfully', async () => {
    const result = await getHotelAmenityById!({}, { _id: '2' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '2' });
  });

  it('should throw an error', async () => {
    try {
      await getHotelAmenityById!({}, { _id: '2' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to get hotel amenity by id'));
    }
  });
});