import { GraphQLResolveInfo } from 'graphql';
import { editFaqs } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

const { HotelModel } = jest.requireMock('../../../../src/models');

describe('Edit Hotel Frequently asked questions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw hotel not found error', async () => {
    HotelModel.findById.mockResolvedValueOnce(null);

    const mockInput = {
      id: '678cb7f6a4e7125effcba04c',
    };
    try {
      await editFaqs!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Hotel Not Found'));
    }
  });

  it('should return the updated hotel', async () => {
    const mockInput = {
      id: '678cc7f6a4e7125effcba04c',
      name: 'Grand',
      description: 'Testing you know',
      starRating: 4,
      rating: 4.5,
      phoneNumber: '+976 91919191',
      faqs: [
        {
          key: 'hehe',
          value: 'haha',
        },
      ],
    };

    const mockHotel = {
      id: '678cc7f6a4e7125effcba04c',
      name: 'Grand',
      description: 'Testing you know',
      starRating: 4,
      rating: 4.5,
      phoneNumber: '+976 91919191',
      amenities: ['Dajgui service tei gazar shuu'],
      faqs: [
        {
          key: 'hehe',
          value: 'haha',
        },
      ],
    };

    HotelModel.findById.mockResolvedValueOnce(mockHotel);
    HotelModel.findByIdAndUpdate.mockResolvedValueOnce(mockHotel);

    const response = await editFaqs!({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(mockHotel);
  });
});
