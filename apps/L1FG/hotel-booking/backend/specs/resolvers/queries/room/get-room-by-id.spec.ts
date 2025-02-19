import { getRoomById } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  RoomModel: {
    findById: jest.fn(),
  },
}));

describe('getRoomById', () => {
  const mockFindById = jest.requireMock('../../../../src/models').RoomModel.findById;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return hotel if found', async () => {
    mockFindById.mockResolvedValueOnce({ _id: '67ac20f0bf3fd0a654c6d69b' });

    const response = await getRoomById!({}, { id: '67ac20f0bf3fd0a654c6d69b' }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual({ _id: '67ac20f0bf3fd0a654c6d69b' });
  });

  it('should throw an error if hotel not found', async () => {
    mockFindById.mockResolvedValueOnce(null);

    try {
      await getRoomById!({}, { id: '64b5fddbbc634b0012d91234' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Room not found'));
    }
  });

  it('should throw an error for invalid ObjectId format', async () => {
    try {
      await getRoomById!({}, { id: 'hehe' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid ID format'));
    }
  });
});
