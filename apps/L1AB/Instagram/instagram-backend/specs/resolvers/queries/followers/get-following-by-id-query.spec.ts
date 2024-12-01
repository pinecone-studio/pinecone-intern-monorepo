import { getFollowingById } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  followersModel: {
    find: jest
      .fn()
      .mockReturnValueOnce({
        populate: jest.fn().mockResolvedValueOnce([
          {
            toObject: () => ({
              _id: '1',
            }),
          },
        ]),
      })
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({ toObject: () => [] }),
      }),
  },
}));

describe('getFollowingById', () => {
  it('it should get all following', async () => {
    await getFollowingById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
  });

  it('it should throw an error', async () => {
    try {
      await getFollowingById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Following not found'));
    }
  });
});
