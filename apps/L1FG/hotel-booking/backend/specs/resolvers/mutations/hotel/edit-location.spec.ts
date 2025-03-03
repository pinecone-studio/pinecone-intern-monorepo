import { GraphQLResolveInfo } from 'graphql';
import { editLocation } from '../../../../src/resolvers/mutations/hotel/edit-location';

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));
const { HotelModel } = jest.requireMock('../../../../src/models');

describe('Edit Hotel Location', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw hotel not found error', async () => {
    HotelModel.findById.mockResolvedValueOnce(null);

    const mockInput = {
      id: '678cb7f6a4e7125effcba04c',
    };

    const response = await editLocation!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(new Error('Hotel Not Found'));
  });

  it('should return the updated hotel', async () => {
    const mockInput = {
      id: '678cc7f6a4e7125effcba04c',
      locationName: 'Aimr hotel',
      location: { type: 'Point', coordinates: [40.5, 41.5] },
    };

    const mockHotel = {
      id: '678cc7f6a4e7125effcba04c',
      locationName: 'Aimr hotel',
      location: { type: 'Point', coordinates: [40.5, 41.5] },
    };

    HotelModel.findById.mockResolvedValueOnce(mockHotel);
    HotelModel.findByIdAndUpdate.mockResolvedValueOnce(mockHotel);

    const response = await editLocation!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockHotel);
  });
});
