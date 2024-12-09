import { GraphQLResolveInfo } from 'graphql';
import { RoomType } from 'apps/L1AB/hotel-booking/backend/src/generated';
import { createRoom } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  roomModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        name: 'Test',
        roomNumber: '12',
        price: 200,
        roomType: 'ONE',
        description: 'Test',
        photos: ['url1', 'url2'],
        hotelId: 'dahs',
        maxCapacity: 2,
      })
      .mockRejectedValueOnce(new Error('Failed to add room')),
  },
}));

describe('Create room', () => {
  it('should create a room successfully', async () => {
    const mockInput = {
      name: 'Test',
      roomNumber: '12',
      price: 200,
      roomType: RoomType.One,
      description: 'Test',
      photos: ['url1', 'url2'],
      hotelId: 'dahs',
      maxCapacity: 2,
    };

    const result = await createRoom!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      name: 'Test',
      roomNumber: '12',
      price: 200,
      roomType: RoomType.One,
      maxCapacity: 2,
      description: 'Test',
      photos: ['url1', 'url2'],
      hotelId: 'dahs',
    });
  });

  it('should return error when room creation fails', async () => {
    const mockInput = {
      name: 'Test',
      roomNumber: '12',
      price: 200,
      roomType: RoomType.One,
      description: 'Test',
      photos: ['url1', 'url2'],
      hotelId: 'dahs',
      maxCapacity: 2,
    };

    try {
      await createRoom!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to add room'));
    }
  });
});
