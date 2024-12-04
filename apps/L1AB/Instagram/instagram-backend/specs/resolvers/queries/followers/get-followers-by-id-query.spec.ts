import { GraphQLResolveInfo } from 'graphql';
import { getFollowersById } from '../../../../src/resolvers/queries';

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

describe('getFollowersById', () => {
  it('it should get all followers', async () => {
    await getFollowersById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
  });

  it('it should throw an error', async () => {
    try {
      await getFollowersById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Followers not found'));
    }
  });
});
