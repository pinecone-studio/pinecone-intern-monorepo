import { updateAmenity } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  amenityModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        name: 'test',
      })
      .mockRejectedValueOnce(''),
  },
}));

describe('Update amenity', () => {
  it('should update a amenity successfully', async () => {
    const result = await updateAmenity!({}, { input: { _id: '1', name: 'test' } }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      name: 'test',
    });
  });

  it('should return error when there is a failure in updating the amenity', async () => {
    try {
      await updateAmenity!({}, { input: { _id: '1', name: 'test' } }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to update amenity');
      }
    }
  });
});
