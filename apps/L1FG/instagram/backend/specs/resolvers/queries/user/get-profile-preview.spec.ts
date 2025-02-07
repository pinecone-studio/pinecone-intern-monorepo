import { UserModel } from 'apps/L1FG/instagram/backend/src/models';
import { getProfilePreview } from 'apps/L1FG/instagram/backend/src/resolvers/queries/user/get-profile-preview';
import { firstThreePosts } from 'apps/L1FG/instagram/backend/src/resolvers/user/profile-preview-type/first-three-posts';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('apps/L1FG/instagram/backend/src/models');
jest.mock('apps/L1FG/instagram/backend/src/resolvers/user/profile-preview-type/first-three-posts');
describe('Get profile preview', () => {
  it('Should throw an authorization error', async () => {
    if (!getProfilePreview) return;
    await expect(getProfilePreview({}, { searchingUserId: '' }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Та нэвтэрнэ үү');
  });
  it('Should return correctly', async () => {
    if (!getProfilePreview) return;
    (UserModel.findById as jest.Mock).mockResolvedValue({
      _id: '8',
      userName: 'john',
    });
    (firstThreePosts as jest.Mock).mockResolvedValue([
      {
        // eslint-disable-next-line no-secrets/no-secrets
        cursor: 'Njc5YjFmMDEzZGViMTkwNjQyMGZjZTMx',
        node: { _id: '679b1f013deb1906420fce31', title: 'Mock Post' },
      },
    ]);
    const result = await getProfilePreview({}, { searchingUserId: '123' }, { userId: '134' }, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      searchingUserId: '123',
      user: {
        _id: '8',
        userName: 'john',
      },
      viewer: {
        _id: '8',
        userName: 'john',
      },
      firstThreePosts: [
        {
          // eslint-disable-next-line no-secrets/no-secrets
          cursor: 'Njc5YjFmMDEzZGViMTkwNjQyMGZjZTMx',
          node: { _id: '679b1f013deb1906420fce31', title: 'Mock Post' },
        },
      ],
    });
  });
});
