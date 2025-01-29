import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { savedSearchUser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');
describe('saved users', () => {
  it('Should  ', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ _id: '678df49a80d39dd699ce316f', userId: '678df49a80d39dd699ce316f', savedUsers: ['678df49a80d39dd699ce316f'] });
    if (!savedSearchUser) return;

    const result = await savedSearchUser({}, { searchedUserId: '678df49a80d39dd699ce316f' }, { userId: '678df49a80d39dd699ce316f' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '678df49a80d39dd699ce316f', userId: '678df49a80d39dd699ce316f', savedUsers: ['678df49a80d39dd699ce316f'] });
  });
});
