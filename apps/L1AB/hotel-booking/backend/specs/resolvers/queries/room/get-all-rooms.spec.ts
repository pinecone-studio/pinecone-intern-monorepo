import { roomModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { getAllRooms } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  roomModel: {
    find: jest.fn(),
  },
}));

describe('get all rooms', () => {
  it('should get all rooms successfully', async () => {
    jest.mocked(roomModel.find).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce([
        { toObject: jest.fn().mockReturnValue({ name: 'uruu2', hotelId: '123' }) },
        { toObject: jest.fn().mockReturnValue({ name: 'room2', hotelId: '124' }) },
      ]),
    } as any);

    const result = await getAllRooms!({}, {}, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      { name: 'uruu2', hotelId: '123' },
      { name: 'room2', hotelId: '124' },
    ]);
  });

  it('should throw an error', async () => {
    jest.mocked(roomModel.find).mockImplementationOnce(() => ({
      populate: jest.fn().mockRejectedValueOnce(new Error('Database error')),
    } as any));

    try {
      await getAllRooms!({}, {}, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to get rooms');
      }
    }
  });
});
