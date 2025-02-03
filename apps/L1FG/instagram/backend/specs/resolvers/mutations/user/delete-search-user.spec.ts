import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { deleteSearchUser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('deleteUser', () => {
  it('update', () => {
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      _id: '678df49a80d39dd699ce316f',
      userId: '678df49a80d39dd699ce316f',
      savedUsers: ['678df49a80d39dd699ce316f', '678df49a80d39dd699ce316f'],
    });

    if (!deleteSearchUser) return;
    deleteSearchUser({}, { searchedUserId: '678df49a80d39dd699ce316f' }, { userId: '678df49a80d39dd699ce316f' }, {} as GraphQLResolveInfo);
  });
});
