import { createAmenity } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  amenityModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        name: 'test',
      })
      .mockRejectedValueOnce(new Error('Failed to create amenity')),
  },
}));
describe('Create amenity', () => {
  it('should create a amenity successfully', async () => {
    const mockInput = {
      name: 'test',
    };

    const result = await createAmenity!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      name: 'test',
    });
  });

  it('should return error when amenity creation fails', async () => {
    const mockInput = {
      name: 'test',
    };

    try {
      await createAmenity!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to create amenity');
      }
    }
  });
});
