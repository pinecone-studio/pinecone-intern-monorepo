import { GraphQLResolveInfo } from 'graphql';
import { getHotelById } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries/hotel/get-hotel-by-id';

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    findById: jest.fn(),
  },
}));

describe('getHotelById', () => {
  const mockFindById = jest.requireMock('../../../../src/models').HotelModel.findById;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return hotel if found', async () => {
    mockFindById.mockResolvedValueOnce({ _id: '678cc7f6a4e7125effcba04c' });

    if (!getHotelById) {
      throw new Error('getHotelById is not defined');
    }

    const response = await getHotelById({}, { id: '678cc7f6a4e7125effcba04c' }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual({ _id: '678cc7f6a4e7125effcba04c' });
  });

  it('should throw an error if hotel not found', async () => {
    mockFindById.mockResolvedValueOnce(null);

    try {
      if (!getHotelById) {
        throw new Error('getHotelById is not defined');
      }
      await getHotelById({}, { id: '64b5fddbbc634b0012d91234' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Hotel not found'));
    }
  });

  it('should throw an error for invalid ObjectId format', async () => {
    try {
      if (!getHotelById) {
        throw new Error('getHotelById is not defined');
      }
      await getHotelById({}, { id: 'hehe' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid ID format'));
    }
  });
});
