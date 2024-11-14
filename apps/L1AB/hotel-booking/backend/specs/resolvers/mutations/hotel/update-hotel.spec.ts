import { updateHotel } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/hotel';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        name: 'test',
      })
      .mockRejectedValueOnce(''),
  },
}));

describe('Update hotel', () => {
  it('should update a hotel successfully', async () => {
    const result = await updateHotel!({}, { input: { _id: '1', name: 'test' } }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      name: 'test',
    });
  });

  it('should return error when there is a failure in updating the hotel', async () => {
    try {
      await updateHotel!({}, { input: { _id: '1', name: 'test' } }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to update hotel'));
    }
  });
});
