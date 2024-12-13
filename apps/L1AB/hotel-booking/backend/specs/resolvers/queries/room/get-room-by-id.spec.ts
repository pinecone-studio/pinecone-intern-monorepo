import { roomModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { getRoomById } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  roomModel: {
    find: jest.fn(),
  },
}));

describe('getRoomById', () => {
  it('should get room by id successfully, including hotelId and roomAmenities', async () => {
    jest.mocked(roomModel.find).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce([
        {
          toObject: jest.fn().mockReturnValue({
            _id: '1',
            name: 'uruu2',
            hotelId: { _id: '123', name: 'Hotel XYZ' },
            roomAmenities: [
              { _id: 'a1', name: 'Free Wi-Fi', icon: 'FaHouse' },
              { _id: 'a2', name: 'Air Conditioning', icon: 'FaPlus' },
            ],
          }),
        },
      ]),
    } as any);

    const result = await getRoomById!({}, { _id: '2' }, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual([
      {
        _id: '1',
        name: 'uruu2',
        hotelId: { _id: '123', name: 'Hotel XYZ' },
        roomAmenities: [
          { _id: 'a1', name: 'Free Wi-Fi', icon: 'FaHouse' },
          { _id: 'a2', name: 'Air Conditioning', icon: 'FaPlus' },
        ],
      },
    ]);
  });

  it('should throw an error if there is a database error', async () => {
    jest.mocked(roomModel.find).mockImplementationOnce(
      () =>
        ({
          populate: jest.fn().mockRejectedValueOnce(new Error('Database error')),
        } as any)
    );

    try {
      await getRoomById!({}, { _id: '1' }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to get room by id'));
    }
  });
});
