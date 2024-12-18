import { getSuggestedUsers } from 'apps/L1AB/Instagram/instagram-backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  followersModel: {
    find: jest
      .fn()
      .mockReturnValueOnce([{ followeeId: '2' }, { followeeId: '3' }])
      .mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          populate: jest.fn().mockReturnValueOnce([
            {
              toObject: () => ({
                _id: '1',
              }),
            },
          ]),
        }),
      }),
  },
}));

describe('getSuggestedUsers', () => {
  it('it should get suggested users', async () => {
    await getSuggestedUsers!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
  });
});
