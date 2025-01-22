import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { getUserTogether } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models');
describe('Get user together', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should give user', async () => {
    if (!getUserTogether) return;
    (UserModel.findById as jest.Mock).mockResolvedValue({
      _id: '8',
      userName: 'john',
    });
    const result = await getUserTogether({}, { searchingUserId: '8' }, { userId: '3' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      user: {
        _id: '8',
        userName: 'john',
      },
      viewer: {
        _id: '8',
        userName: 'john',
      },
    });
  });
  it('Should throw an unauthorized error', async () => {
    if (!getUserTogether) return;
    (UserModel.findById as jest.Mock).mockResolvedValue({
      _id: '8',
      userName: 'john',
    });
    await expect(getUserTogether({}, { searchingUserId: '8' }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});
