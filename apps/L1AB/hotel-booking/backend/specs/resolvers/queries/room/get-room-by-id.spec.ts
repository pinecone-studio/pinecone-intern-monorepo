import { roomModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { getRoomById } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  roomModel: {
    find: jest.fn(),
  },
}));

describe('get room by id', () => {
  it('should get room by id successfully', async () => {
    jest.mocked(roomModel.find).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce([{ toObject: jest.fn().mockReturnValue({ _id: '1', name: 'uruu2', hotelId: '123' }) }]),
    } as any);

    const result = await getRoomById!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual([{ _id: '1', name: 'uruu2', hotelId: '123' }]);
  });

  it('should throw an error', async () => {
    jest.mocked(roomModel.find).mockImplementationOnce(
      () =>
        ({
          populate: jest.fn().mockRejectedValueOnce(new Error('Database error')),
        } as any)
    );

    try {
      await getRoomById!({}, { _id: '2' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to get room by id');
      }
    }
  });
});
