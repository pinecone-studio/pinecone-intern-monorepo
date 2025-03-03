import { GraphQLResolveInfo } from 'graphql';
import { getBookings } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  BookingModel: {
    find: jest.fn().mockResolvedValue([]),
  },
}));

describe('getBookings', () => {
  it('should get bookings', async () => {
    const response = await getBookings!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual([]);
  });
});
