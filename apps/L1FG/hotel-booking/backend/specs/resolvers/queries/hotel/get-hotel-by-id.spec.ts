import { GraphQLResolveInfo } from 'graphql';
import { getHotelById } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries/hotel/get-hotel-by-id';
import { HotelModel } from 'apps/L1FG/hotel-booking/backend/src/models';

jest.mock('apps/L1FG/hotel-booking/backend/src/models', () => ({
  HotelModel: {
    findById: jest.fn(),
  },
}));

const hotelId = '6786c58b136cec130f8d1d3b';

describe('getHotelById', () => {
  it('should return hotel if found', async () => {
    const mockHotel = {
      id: hotelId,
      name: 'Test Hotel',
      phoneNumber: '123456789',
      rating: 4.5,
      starRating: 5,
      description: 'A nice hotel.',
      images: ['image1.jpg'],
      rooms: ['room1'],
      faqs: ['faq1'],
      policies: ['policy1'],
      about: ['about1'],
      location: { type: 'Point', coordinates: [0, 0] },
      locationName: 'Test Location',
    };

    (HotelModel.findById as jest.Mock).mockResolvedValue(mockHotel);

    const response = await getHotelById!({}, { id: hotelId }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual(mockHotel);
  });

  it('should throw an error if hotel not found', async () => {
    (HotelModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(getHotelById!({}, { id: hotelId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Hotel not found');
  });

  it('should throw an error if ID format is invalid', async () => {
    const invalidId = 'invalidObjectId';

    await expect(getHotelById!({}, { id: invalidId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid ObjectId format');
  });
});
