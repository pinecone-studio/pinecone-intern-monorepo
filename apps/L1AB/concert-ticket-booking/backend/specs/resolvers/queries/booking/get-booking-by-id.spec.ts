import { getBookingById } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    findById: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockResolvedValueOnce(null),
  },
}));

describe('getBookingById', () => {
  it('should get event by id', async () => {
    const booking = await getBookingById!({}, { _id: '1' }, { name: 'zul' }, {} as GraphQLResolveInfo);
    expect(booking).toEqual({ _id: '1' });
  });

  it('should throw an error if booking not found', async () => {
    try {
      await getBookingById!({}, { _id: '1' }, { name: 'zul' }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Booking not found'));
    }
  });
});
