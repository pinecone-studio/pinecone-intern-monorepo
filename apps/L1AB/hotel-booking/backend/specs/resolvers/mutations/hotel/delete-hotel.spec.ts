import { deleteHotel } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/hotel';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelModel: {
    findByIdAndDelete: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockRejectedValueOnce(''),
  },
}));

describe('Delete hotel', () => {
  it('should delete hotel', async () => {
    const result = await deleteHotel!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '1' });
  });

  it("should throw an error if the hotel doesn't exist", async () => {
    try {
      await deleteHotel!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to delete hotel'));
    }
  });
});
