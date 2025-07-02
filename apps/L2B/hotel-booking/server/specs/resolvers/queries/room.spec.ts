const mockRoomModel = {
  find: jest.fn(),
  findById: jest.fn(),
};

jest.mock('../../../src/models', () => ({
  roomModel: mockRoomModel,
}));

import { GraphQLResolveInfo } from 'graphql';
import { room, rooms, roomsByHotel } from '../../../src/resolvers/queries/room';

describe('Room Query Resolvers', () => {
  const info = {} as GraphQLResolveInfo;
  const mockRoom = {
    _id: 'room1',
    name: 'Deluxe Room',
    hotelId: { _id: 'hotel1', name: 'Test Hotel' },
    pricePerNight: 100,
    isAvailable: true,
  };

  const createMockQuery = (resolveValue: any) => ({
    populate: jest.fn().mockReturnThis(),
    then: jest.fn((resolve) => resolve(resolveValue)),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rooms', () => {
    it('should return all rooms with populated hotel', async () => {
      const mockQuery = createMockQuery([mockRoom]);
      mockRoomModel.find.mockReturnValueOnce(mockQuery);

      const result = await rooms!({}, {}, {}, info);

      expect(mockRoomModel.find).toHaveBeenCalledWith();
      expect(mockQuery.populate).toHaveBeenCalledWith('hotelId');
      expect(result).toEqual([mockRoom]);
    });

    it('should return empty array when no rooms exist', async () => {
      const mockQuery = createMockQuery([]);
      mockRoomModel.find.mockReturnValueOnce(mockQuery);

      const result = await rooms!({}, {}, {}, info);
      expect(result).toEqual([]);
    });
  });

  describe('room', () => {
    it('should return a room by ID with populated hotel', async () => {
      const mockQuery = createMockQuery(mockRoom);
      mockRoomModel.findById.mockReturnValueOnce(mockQuery);

      const result = await room!({}, { id: 'room1' }, {}, info);

      expect(mockRoomModel.findById).toHaveBeenCalledWith('room1');
      expect(mockQuery.populate).toHaveBeenCalledWith('hotelId');
      expect(result).toEqual(mockRoom);
    });

    it('should throw an error if room not found (null)', async () => {
      const mockQuery = createMockQuery(null);
      mockRoomModel.findById.mockReturnValueOnce(mockQuery);

      await expect(room!({}, { id: 'invalid-id' }, {}, info)).rejects.toThrow('Room not found.');
    });

    it('should throw an error if room not found (undefined)', async () => {
      const mockQuery = createMockQuery(undefined);
      mockRoomModel.findById.mockReturnValueOnce(mockQuery);

      await expect(room!({}, { id: 'undefined-id' }, {}, info)).rejects.toThrow('Room not found.');
    });
  });

  describe('roomsByHotel', () => {
    it('should return rooms by hotel ID with populated hotel', async () => {
      const mockQuery = createMockQuery([mockRoom]);
      mockRoomModel.find.mockReturnValueOnce(mockQuery);

      const result = await roomsByHotel!({}, { hotelId: 'hotel1' }, {}, info);

      expect(mockRoomModel.find).toHaveBeenCalledWith({ hotelId: 'hotel1' });
      expect(mockQuery.populate).toHaveBeenCalledWith('hotelId');
      expect(result).toEqual([mockRoom]);
    });

    it('should return empty array when hotel has no rooms', async () => {
      const mockQuery = createMockQuery([]);
      mockRoomModel.find.mockReturnValueOnce(mockQuery);

      const result = await roomsByHotel!({}, { hotelId: 'hotel-no-rooms' }, {}, info);
      expect(result).toEqual([]);
    });

    it('should handle different hotelId formats', async () => {
      const mockQuery = createMockQuery([mockRoom]);
      mockRoomModel.find.mockReturnValueOnce(mockQuery);

      await roomsByHotel!({}, { hotelId: '507f1f77bcf86cd799439012' }, {}, info);

      expect(mockRoomModel.find).toHaveBeenCalledWith({ hotelId: '507f1f77bcf86cd799439012' });
    });

    it('should handle null hotelId parameter', async () => {
      const mockQuery = createMockQuery([]);
      mockRoomModel.find.mockReturnValueOnce(mockQuery);

      await roomsByHotel!({}, { hotelId: null as any }, {}, info);

      expect(mockRoomModel.find).toHaveBeenCalledWith({ hotelId: null });
    });
  });
});
