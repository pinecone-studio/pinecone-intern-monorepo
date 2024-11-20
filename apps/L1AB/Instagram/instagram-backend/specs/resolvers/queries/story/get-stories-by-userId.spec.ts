import { getStoriesByUserId } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  storyModel: {
    find: jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValueOnce([
        {
          _id: '1',
        },
      ]),
    }),
  },
}));

describe('getAllStoriesByUserID resolver', () => {
  it('should get all stories by userId', async () => {
    const res = await getStoriesByUserId!({}, { userId: '1' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual([{ _id: '1' }]);
  });
});
