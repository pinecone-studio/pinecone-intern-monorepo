import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { deleteAllSearchUser } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');

describe('delete users', () => {
  it('delete', async () => {
    (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue([]);

    if (!deleteAllSearchUser) return;

    const result = await deleteAllSearchUser({}, {}, { userId: '1' }, {} as GraphQLResolveInfo);

    expect(result).toEqual(undefined);
  });
});
