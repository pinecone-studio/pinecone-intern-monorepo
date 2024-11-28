import { hotelModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { getHotelById } from 'apps/L1AB/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';
import { ObjectId } from 'mongodb';

jest.mock('../../../../src/models', () => ({
  hotelModel: {
    aggregate: jest.fn(),
  },
}));

describe('getHotelById', () => {
  it('should return hotel details when a hotel is found and hotelAmenities is populated', async () => {
    const mockHotelId = '507f1f77bcf86cd799439011';
    const mockHotel = {
      _id: new ObjectId(mockHotelId),
      name: 'Test Hotel',
      hotelAmenities: [{ amenity: 'Pool' }],
      rooms: [{ roomNumber: '101' }],
    };

    (hotelModel.aggregate as jest.Mock).mockResolvedValue([mockHotel]);

    const result = await getHotelById!({}, { _id: mockHotelId }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      ...mockHotel,
      hotelAmenities: mockHotel.hotelAmenities[0] || null,
    });

    expect(hotelModel.aggregate).toHaveBeenCalledTimes(1);
  });

  it('should return hotel details with hotelAmenities as null when it is empty', async () => {
    const mockHotelId = '507f1f77bcf86cd799439011';
    const mockHotel = {
      _id: new ObjectId(mockHotelId),
      name: 'Test Hotel',
      hotelAmenities: [],
      rooms: [{ roomNumber: '101' }],
    };

    (hotelModel.aggregate as jest.Mock).mockResolvedValue([mockHotel]);

    const result = await getHotelById!({}, { _id: mockHotelId }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      ...mockHotel,
      hotelAmenities: null,
    });

    expect(hotelModel.aggregate).toHaveBeenCalledTimes(2);
  });

  it('should throw an error if no hotel is found', async () => {
    const mockHotelId = '507f1f77bcf86cd799439011';

    (hotelModel.aggregate as jest.Mock).mockResolvedValue([]);

    await expect(getHotelById!({}, { _id: mockHotelId }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Hotel not found');
  });
});
