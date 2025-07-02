import { GraphQLResolveInfo } from 'graphql';
import { createRoom, updateRoom, deleteRoom } from '../../../src/resolvers/mutations';
import { roomModel } from '../../../src/models';
import { MutationCreateRoomArgs, MutationUpdateRoomArgs, MutationDeleteRoomArgs } from '../../../src/generated';

jest.mock('../../../src/models', () => ({
  roomModel: {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

describe('Room Mutation Resolvers', () => {
  const info = {} as GraphQLResolveInfo;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a room', async () => {
    const input = {
      name: 'Deluxe',
      price: 100,
      hotelId: 'hotel123',
    };

    const mockCreated = {
      ...input,
      toObject: () => ({ ...input }),
    };

    (roomModel.create as jest.Mock).mockResolvedValueOnce(mockCreated);

    const args: MutationCreateRoomArgs = { input };
    const result = await createRoom!({}, args, {}, info);

    expect(roomModel.create).toHaveBeenCalledWith(input);
    expect(result).toEqual({
      name: 'Deluxe',
      price: 100,
      hotelId: 'hotel123',
    });
  });

  it('should throw error if createRoom fails', async () => {
    (roomModel.create as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

    const args: MutationCreateRoomArgs = {
      input: {
        name: 'Error Room',
        price: 200,
        hotelId: 'failHotel',
      },
    };

    await expect(createRoom!({}, args, {}, info)).rejects.toThrow('Failed to create room: ');
  });

  it('should update a room', async () => {
    const updatedRoom = {
      _id: 'room123',
      name: 'Updated Deluxe',
      price: 150,
      hotelId: 'hotel123',
    };

    (roomModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updatedRoom);

    const args: MutationUpdateRoomArgs = {
      id: 'room123',
      input: { name: 'Updated Deluxe', price: 150 },
    };

    const result = await updateRoom!({}, args, {}, info);
    expect(roomModel.findByIdAndUpdate).toHaveBeenCalledWith('room123', args.input, { new: true });
    expect(result).toEqual(updatedRoom);
  });

  it('should throw error if room to update is not found', async () => {
    (roomModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    const args: MutationUpdateRoomArgs = {
      id: 'notfound',
      input: { name: 'No Room' },
    };

    await expect(updateRoom!({}, args, {}, info)).rejects.toThrow('Room not found.');
  });

  it('should delete a room', async () => {
    const deletedRoom = { _id: 'room123', name: 'Deluxe' };

    (roomModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(deletedRoom);

    const args: MutationDeleteRoomArgs = { id: 'room123' };
    const result = await deleteRoom!({}, args, {}, info);

    expect(roomModel.findByIdAndDelete).toHaveBeenCalledWith('room123');
    expect(result).toEqual({
      success: true,
      message: 'Room deleted successfully.',
    });
  });

  it('should throw error if room to delete is not found', async () => {
    (roomModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

    const args: MutationDeleteRoomArgs = { id: 'missing-room' };

    await expect(deleteRoom!({}, args, {}, info)).rejects.toThrow('Room not found.');
  });
});
