import { updateAmenity } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  amenityModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        name: 'test',
        icon: 'testicon',
      })
      .mockRejectedValueOnce(''),
  },
}));

describe('Update amenity', () => {
  it('should update an amenity successfully', async () => {
    const mockInput = {
      _id: '1',
      name: 'test',
      icon: 'testicon',
    };

    const result = await updateAmenity!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      name: 'test',
      icon: 'testicon',
    });
  });

  it('should return an error when there is a failure in updating the amenity', async () => {
    const mockInput = {
      _id: '1',
      name: 'test',
      icon: 'testicon',
    };

    try {
      await updateAmenity!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to update amenity'));
    }
  });
});
