import { getAllBooking } from '../../../../src/resolvers/queries/booking';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  bookingModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        _id: '1',
      }),
    }),
  },
}));

describe('getAllCancelBooking', () => {
  it('should getAllCancelBooking', async () => {
    if (getAllBooking) {
      const res = await getAllBooking({}, {}, {}, {} as GraphQLResolveInfo);
      expect(res).toEqual({
        _id: '1',
      });
    }
  });
});
