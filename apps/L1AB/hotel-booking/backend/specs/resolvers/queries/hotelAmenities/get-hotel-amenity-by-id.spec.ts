import { hotelAmenitiesModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { getHotelAmenityById } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelAmenitiesModel: {
    find: jest.fn(),
  },
}));

describe('get hotel amenities by id', () => {
  it('should get hotel amenities by id successfully', async () => {
    jest.mocked(hotelAmenitiesModel.find).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce([
        {
          toObject: jest.fn().mockReturnValue({ _id: '2', hotelId: '1', amenities: ['1', '2'] }),
        },
      ]),
    } as any);

    const result = await getHotelAmenityById!({}, {_id: "2"}, {} as any, {} as GraphQLResolveInfo);
    expect(result).toEqual([{ _id: '2', hotelId: '1', amenities: ['1', '2'] }]);
  });

  it('should throw an error', async () => {
    jest.mocked(hotelAmenitiesModel.find).mockImplementationOnce(
      () =>
        ({
          populate: jest.fn().mockRejectedValueOnce(new Error('Database error')),
        } as any)
    );

    try {
      await getHotelAmenityById!({}, {_id: "2"}, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Failed to get hotel amenity by id'));
    }
  });
});
