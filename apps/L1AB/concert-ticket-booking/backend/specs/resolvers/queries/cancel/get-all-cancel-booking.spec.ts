import { getAllCancelBooking } from '../../../../src/resolvers/queries/cancel';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  cancelModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        _id: '1',
      }),
    }),
  },
}));

describe('getAllCancelBooking', () => {
  it('should getAllCancelBooking', async () => {
    if (getAllCancelBooking) {
      const res = await getAllCancelBooking({}, {}, {}, {} as GraphQLResolveInfo);
      expect(res).toEqual({
        _id: '1',
      });
    }
  });
});
