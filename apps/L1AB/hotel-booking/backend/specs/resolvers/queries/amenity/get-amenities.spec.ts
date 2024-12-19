import { getAllAmenities } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries/amenity';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  amenityModel: {
    find: jest.fn().mockResolvedValueOnce({ name: 'test' }).mockRejectedValueOnce(''),
  },
}));

describe('getAllAmenities', () => {
  it('should get all amenities', async () => {
    const user = {};
    const res = await getAllAmenities!({}, {}, { user }, {} as GraphQLResolveInfo);

    expect(res).toEqual({ name: 'test' });
  });

  it('should throw an error', async () => {
    const user = {};
    try {
      await getAllAmenities!({}, {}, { user }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to get all amenities'));
    }
  });
});
