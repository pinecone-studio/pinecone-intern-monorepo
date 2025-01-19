import { GraphQLResolveInfo } from 'graphql';
import { createHotel } from '../../../../src/resolvers/mutations/hotel/create-hotel';
import { CreateHotelInput } from 'apps/L1FG/hotel-booking/backend/src/generated';
import { HotelModel } from '../../../../src/models';

const hotel: CreateHotelInput = {
  name: 'Hotel Example',
  phoneNumber: '123-456-7890',
  rating: 4.5,
  starRating: 5,
  description: 'A beautiful hotel.',
  images: ['image1.jpg', 'image2.jpg'],
  rooms: [],
  faqs: [{ key: 'Is breakfast included?', value: 'Yes' }],
  policies: [{ key: 'No smoking.', value: 'Enforced' }],
  about: [{ key: 'Location', value: 'Located in downtown.' }],
  location: {
    type: 'Point',
    coordinates: [40.7128, -74.006],
  },
  locationName: 'New York City',
};

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    create: jest.fn(),
  },
}));

describe('createHotel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error response if HotelModel.create fails', async () => {
    (HotelModel.create as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    const response = await createHotel!({}, { input: hotel }, {}, {} as GraphQLResolveInfo);

    expect(response.code).toBe(500);
    expect(response.success).toBe(false);
    expect(response.message).toBe('Failed to create hotel');
    expect(response.hotel).toBeUndefined();
  });

  it('should create a hotel successfully', async () => {
    (HotelModel.create as jest.Mock).mockResolvedValueOnce({
      name: 'Hotel Example',
      phoneNumber: '123-456-7890',
      rating: 4.5,
      starRating: 5,
      description: 'A beautiful hotel.',
      images: ['image1.jpg', 'image2.jpg'],
      rooms: [],
      faqs: [{ key: 'Is breakfast included?', value: 'Yes' }],
      policies: [{ key: 'No smoking.', value: 'Enforced' }],
      about: [{ key: 'Location', value: 'Located in downtown.' }],
      location: {
        type: 'Point',
        coordinates: [40.7128, -74.006],
      },
      locationName: 'New York City',
    });

    const response = await createHotel!({}, { input: hotel }, {}, {} as GraphQLResolveInfo);

    expect(response.code).toBe(200);
    expect(response.success).toBe(true);
    expect(response.message).toBe('Hotel created successfully');
    expect(response.hotel?.name).toBe('Hotel Example');
    expect(response.hotel?.faqs).toEqual([{ key: 'Is breakfast included?', value: 'Yes' }]);
    expect(response.hotel?.policies).toEqual([{ key: 'No smoking.', value: 'Enforced' }]);
    expect(response.hotel?.about).toEqual([{ key: 'Location', value: 'Located in downtown.' }]);
  });
});
