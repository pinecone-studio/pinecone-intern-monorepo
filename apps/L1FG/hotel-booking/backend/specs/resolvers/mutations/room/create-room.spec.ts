import { GraphQLResolveInfo } from 'graphql';
import { createRoom } from '../../../../src/resolvers/mutations/room/create-room';
import { CreateRoomInput } from 'apps/L1FG/hotel-booking/backend/src/generated';
import { RoomModel } from '../../../../src/models';

const room: CreateRoomInput = {
  bed: 1,
  name: 'Luxury room 1',
  hotelId: '6787f9fb63d1acf3c7db3bd4',
  images: ['image1'],
  price: 150000,
  roomInfo: ['Gal uruu', 'buh ymtai'],
  roomNumber: 101,
  roomServices: ['jargaanaa'],
  tax: 15000,
  type: 'aimr',
};

jest.mock('../../../../src/models', () => ({
  RoomModel: {
    create: jest.fn(),
  },
}));

describe('createRoom', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error response if RoomModel.create fails', async () => {
    (RoomModel.create as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    const response = await createRoom!({}, { input: room }, {}, {} as GraphQLResolveInfo);

    expect(response.code).toBe(500);
    expect(response.success).toBe(false);
    expect(response.message).toBe('Failed to create room');
    expect(response.room).toBeUndefined();
  });

  it('should create a hotel successfully', async () => {
    (RoomModel.create as jest.Mock).mockResolvedValueOnce({
      bed: 1,
      name: 'Luxury room 1',
      hotelId: '6787f9fb63d1acf3c7db3bd4',
      images: ['image1'],
      price: 150000,
      roomInfo: ['best room'],
      roomNumber: 101,
      roomServices: ['Good'],
      tax: 15000,
      type: '1 bed',
    });

    const response = await createRoom!({}, { input: room }, {}, {} as GraphQLResolveInfo);

    expect(response.code).toBe(200);
    expect(response.success).toBe(true);
    expect(response.message).toBe('Room created successfully');
    expect(response.room?.name).toBe('Luxury room 1');
  });
});
