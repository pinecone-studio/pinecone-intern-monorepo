import { createHotel } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/hotel';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        name: "test",
        description: "test",
        images: ["url1", "url2"],
        address: "test",
        phone: "test",
        city: "test",
        stars: 4.5,
        rating: 5
      })
      .mockRejectedValueOnce(new Error('Failed to create hotel')),
  },
}));

describe('Create hotel', () => {
  it('should create a hotel successfully', async () => {
    const mockInput = {
        name: "test",
        description: "test",
        images: ["url1", "url2"],
        address: "test",
        phone: "test",
        city: "test",
        stars: 4.5,
        rating: 5
    };

    const result = await createHotel!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
        name: "test",
        description: "test",
        images: ["url1", "url2"],
        address: "test",
        phone: "test",
        city: "test",
        stars: 4.5,
        rating: 5
    });
  });

  it('should return error when hotel creation fails', async () => {
    const mockInput = {
        name: "test",
        description: "test",
        images: ["url1", "url2"],
        address: "test",
        phone: "test",
        city: "test",
        stars: 4.5,
        rating: 5
    };

    try {
      await createHotel!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to create hotel');
      }
    }
  });
});
