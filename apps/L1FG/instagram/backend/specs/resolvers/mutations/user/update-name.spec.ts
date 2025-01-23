import { updateName } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  UserModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      userName: 'hun',
    }),
  },
}));

describe('update name', () => {
  it('Should update name', async () => {
    if (!updateName) {
      return;
    }
    const result = await updateName({}, { name: 'hun' }, { userId: '123' }, {} as GraphQLResolveInfo);
    expect(result).toEqual('hun');
  });

  it('Should throw an authorization error', async () => {
    if (!updateName) {
      return;
    }
    await expect(updateName({}, { name: 'hun' }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});
