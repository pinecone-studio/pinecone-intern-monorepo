import { updateRoom } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  roomModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        name: 'buudal',
      })
      .mockRejectedValueOnce(''),
  },
}));

describe('Update room', () => {
  it('should update a room successfully', async () => {
    const result = await updateRoom!({}, { input: { _id: '1', name: 'buudal' } }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      name: 'buudal',
    });
  });

  it('should return error when there is a failure in updating the room', async () => {
    try {
      await updateRoom!({}, { input: { _id: '1', name: 'buudal' } }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to update room');
      }
    }
  });
});
