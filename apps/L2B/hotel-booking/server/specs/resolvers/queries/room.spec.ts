import { GraphQLResolveInfo } from 'graphql';
import { room, rooms, roomsByHotel } from '../../../src/resolvers/queries';
import { roomModel } from '../../../src/models';

jest.mock('../../../src/models', () => ({
  roomModel: {
    find: jest.fn(),
    findById: jest.fn(),
  },
}));

describe('Room Query Resolvers', () => {
  const info = {} as GraphQLResolveInfo;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all rooms', async () => {
    const mockRooms = [
      { _id: '1', name: 'Deluxe' },
      { _id: '2', name: 'Suite' },
    ];
    (roomModel.find as jest.Mock).mockResolvedValueOnce(mockRooms);

    const result = await rooms!({}, {}, {}, info);
    expect(roomModel.find).toHaveBeenCalledWith();
    expect(result).toEqual(mockRooms);
  });

  it('should return a room by ID', async () => {
    const mockRoom = { _id: 'room1', name: 'Deluxe' };
    (roomModel.findById as jest.Mock).mockResolvedValueOnce(mockRoom);

    const result = await room!({}, { id: 'room1' }, {}, info);
    expect(roomModel.findById).toHaveBeenCalledWith('room1');
    expect(result).toEqual(mockRoom);
  });

  it('should throw an error if room not found', async () => {
    (roomModel.findById as jest.Mock).mockResolvedValueOnce(null);

    await expect(room!({}, { id: 'invalid-id' }, {}, info)).rejects.toThrow('Room not found.');
  });

  it('should return rooms by hotel ID', async () => {
    const mockRooms = [
      { _id: '1', hotelId: 'hotel1' },
      { _id: '2', hotelId: 'hotel1' },
    ];
    (roomModel.find as jest.Mock).mockResolvedValueOnce(mockRooms);

    const result = await roomsByHotel!({}, { hotelId: 'hotel1'}, {}, info);
    expect(roomModel.find).toHaveBeenCalledWith({ hotelId: 'hotel1' });
    expect(result).toEqual(mockRooms);
  });
});
