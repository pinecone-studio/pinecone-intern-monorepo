import { GraphQLResolveInfo } from 'graphql';
import { editAmenities } from 'apps/L1FG/hotel-booking/backend/src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

const { HotelModel } = jest.requireMock('../../../../src/models');

describe('Edit Hotel Amenities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw hotel not found error', async () => {
    HotelModel.findById.mockResolvedValueOnce(null);

    const mockInput = {
      id: '678cb7b6a4e7125effcba04c',
    };

    if (!editAmenities) {
      throw new Error('editAmenities is not defined');
    }

    const response = await editAmenities({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(new Error('Hotel Not Found'));
  });

  it('should return the updated hotel', async () => {
    const mockInput = {
      id: '678cc7f6a4e7125effcba04c',
      amenities: ['Aimr', 'Gal'],
    };

    const mockHotel = {
      id: '678cc7f6a4e7125effcba04c',
      amenities: ['Aimr', 'Gal'],
    };

    HotelModel.findById.mockResolvedValueOnce(mockHotel);
    HotelModel.findByIdAndUpdate.mockResolvedValueOnce(mockHotel);

    if (!editAmenities) {
      throw new Error('editAmenities is not defined');
    }

    const response = await editAmenities({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockHotel);
  });
});
