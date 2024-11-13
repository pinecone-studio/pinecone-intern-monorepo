import { deleteAmenity } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  amenityModel: {
    findByIdAndDelete: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockRejectedValueOnce(''),
  },
}));

describe('Delete amenity', () => {
  it('should delete amenity successfully', async () => {
    const result = await deleteAmenity!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '1' });
  });

  it("should throw an error if the amenity don't exist", async () => {
    try {
      await deleteAmenity!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to delete amenity'));
    }
  });
});
