import { getBookingById } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  BookingModel: {
    findById: jest.fn(),
  },
}));

describe('getBookingById', () => {
  const mockFindById = jest.requireMock('../../../../src/models').BookingModel.findById;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return hotel if found', async () => {
    mockFindById.mockResolvedValueOnce({ _id: '67a311772bb60096b24a59d3' });

    const response = await getBookingById!({}, { id: '67a311772bb60096b24a59d3' }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual({ _id: '67a311772bb60096b24a59d3' });
  });

  it('should throw an error if hotel not found', async () => {
    mockFindById.mockResolvedValueOnce(null);

    try {
      await getBookingById!({}, { id: '67a311772bb60096b24a59d3' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Booking not found'));
    }
  });

  it('should throw an error for invalid ObjectId format', async () => {
    try {
      await getBookingById!({}, { id: 'hehe' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid ID format'));
    }
  });
});
