import { createHotelAmenities } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelAmenitiesModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        amenities: ['1', '2'],
        hotelId: 'dahs',
      })
      .mockRejectedValueOnce(new Error('Failed to create hotel amenities')),
  },
}));
describe('Create hotel amenities', () => {
  it('should create a hotel amenities successfully', async () => {
    const mockInput = {
      _id: '1',
      amenities: ['1', '2'],
      hotelId: 'dahs',
    };

    const result = await createHotelAmenities!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      amenities: ['1', '2'],
      hotelId: 'dahs',
    });
  });

  it('should return error when hotel amenities creation fails', async () => {
    const mockInput = {
      _id: '1',
      amenities: ['1', '2'],
      hotelId: 'dahs',
    };

    try {
      await createHotelAmenities!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to create hotel amenities');
      }
    }
  });
});
