import { GraphQLResolveInfo } from 'graphql';
import { editImages } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

const { HotelModel } = jest.requireMock('../../../../src/models');

describe('Edit Hotel Images', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw hotel not found', async () => {
    const mockInput = {
      id: '678cb7b6a4e7125effcba04c',
    };
    HotelModel.findById.mockResolvedValueOnce(null);

    const response = await editImages!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual([]);
  });

  it('should return the updated hotel', async () => {
    const mockInput = {
      id: '678cc7f6a4e7125effcba04c',
      images: ['try1', 'trial2'],
    };

    const mockHotel = {
      id: '678cc7f6a4e7125effcba04c',
      images: ['try1', 'trial2'],
    };

    HotelModel.findById.mockResolvedValueOnce(mockHotel);
    HotelModel.findByIdAndUpdate.mockResolvedValueOnce(mockHotel);

    const response = await editImages!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockHotel);
  });
});
