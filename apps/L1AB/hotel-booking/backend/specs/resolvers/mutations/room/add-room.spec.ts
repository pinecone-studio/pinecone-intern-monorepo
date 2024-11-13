import { GraphQLResolveInfo } from 'graphql';
import { addRoom } from '../../../../src/resolvers/mutations';
import { RoomType } from 'apps/L1AB/hotel-booking/backend/src/generated';

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
    };

    const result = await addRoom!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      name: 'Test',
      roomNumber: '12',
      price: 200,
      roomType: RoomType.One,
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
    };

    try {
      await addRoom!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to add room');
      }
    }
  });
});
