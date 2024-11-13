import { GraphQLResolveInfo } from 'graphql';
import { deleteRoom } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  roomModel: {
    findByIdAndDelete: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockRejectedValueOnce(''),
  },
}));

describe('Delete room', () => {
  it('should delete room', async () => {
    const result = await deleteRoom!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '1' });
  });

  it("should throw an error if the room doesn't exist", async () => {
    try {
      await deleteRoom!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Room not found'));
    }
  });
});
