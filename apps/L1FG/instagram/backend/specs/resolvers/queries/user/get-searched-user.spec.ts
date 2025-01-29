import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { getSearchedUser } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('getUser', () => {
  it('shoud be', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue([]);
    (UserModel.find as jest.Mock).mockResolvedValue([{ _id: '', userName: '', friendshipStatus: { following: false }, profileImage: null }]);

    if (!getSearchedUser) return;

    const result = await getSearchedUser({}, {}, { userId: '' }, {} as GraphQLResolveInfo);

    expect(result).toEqual([{ _id: '', userName: '', friendshipStatus: { following: false }, profileImage: null }]);
  });
});
