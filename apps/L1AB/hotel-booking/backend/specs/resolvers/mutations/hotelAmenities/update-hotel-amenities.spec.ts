import { updateHotelAmenities } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/hotel-amenities/update-hotel-amenities';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelAmenitiesModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        amenities: ['1', '2'],
      })
      .mockRejectedValueOnce(''),
  },
}));

describe('Update hotel amenities', () => {
  it('should update a hotel amenities successfully', async () => {
    const result = await updateHotelAmenities!({}, { input: { _id: '1', amenities: ['1', '2'] } }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      amenities: ['1', '2'],
    });
  });

  it('should return error when there is a failure in updating the hotel amenities', async () => {
    try {
      await updateHotelAmenities!({}, { input: { _id: '1', amenities: ['1', '2'] } }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to update hotel amenities'));
    }
  });
});
