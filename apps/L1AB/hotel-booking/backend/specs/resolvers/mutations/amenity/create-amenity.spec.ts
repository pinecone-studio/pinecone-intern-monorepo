import { createAmenity } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  amenityModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        name: 'test',
      })
      .mockRejectedValueOnce({
        code: 11000,
        message: 'E11000 duplicate key error collection: hotel-booking-dev.amenities index: name_1 dup key: { name: "test" }',
      })
      .mockRejectedValueOnce(new Error('Failed to create amenity')),
  },
}));

describe('Create amenity', () => {
  it('should create an amenity successfully', async () => {
    const mockInput = {
      name: 'test',
    };
    const result = await createAmenity!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      name: 'test',
    });
  });

  it('should throw an error when duplicate amenity name is used', async () => {
    const mockInput = {
      name: 'test',
    };

    try {
      await createAmenity!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('An amenity with the name "test" already exists.'));
    }
  });

  it('should throw a generic error when amenity creation fails', async () => {
    const mockInput = {
      name: 'test',
    };

    try {
      await createAmenity!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to create amenity'));
    }
  });
});
