import { hotelAmenitiesModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { getHotelIdByHotelAmenities } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  hotelAmenitiesModel: {
    findOne: jest.fn(),
  },
}));

describe('getHotelIdByHotelAmenities', () => {
  it('should get hotel ID by hotel amenities successfully', async () => {
    (hotelAmenitiesModel.findOne as jest.Mock).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce({ _id: '123', amenities: ['789', '012'] }),
    });

    const result = await getHotelIdByHotelAmenities!({}, { _id: '123' }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '123',
      amenities: ['789', '012'],
    });
  });

  it('should throw an error if hotel amenities are not found', async () => {
    (hotelAmenitiesModel.findOne as jest.Mock).mockReturnValueOnce({
      populate: jest.fn().mockResolvedValueOnce(null),
    });

    await expect(getHotelIdByHotelAmenities!({}, { _id: '123' }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Hotel amenities with the given ID not found.');
  });
});
