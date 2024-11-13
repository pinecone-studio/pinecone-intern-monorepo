import { deleteHotelAmenities } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/hotel-amenities/delete-hotel-amenities';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelAmenitiesModel: {
    findByIdAndDelete: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockRejectedValueOnce(''),
  },
}));

describe('Delete hotel amenities', () => {
  it('should delete hotel amenities', async () => {
    const result = await deleteHotelAmenities!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '1' });
  });

  it("should throw an error if the hotel amenities don't exist", async () => {
    try {
      await deleteHotelAmenities!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to delete hotel amenities'));
    }
  });
});
