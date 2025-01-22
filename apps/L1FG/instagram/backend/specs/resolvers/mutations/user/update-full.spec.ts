import { updateFullName } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  UserModel: {
    findByIdAndUpdate: jest.fn().mockReturnValue({
      fullName: 'hunbna',
    }),
  },
}));

describe('updated full name', () => {
  it('Should update full name', async () => {
    if (!updateFullName) {
      return;
    }
    const result = await updateFullName({}, { name: 'hunbna' }, { userId: '321' }, {} as GraphQLResolveInfo);
    expect(result).toEqual('hunbna');
  });
  it('Should throw and authorization error', async () => {
    if (!updateFullName) {
      return;
    }
    await expect(updateFullName({}, { name: 'hunbna' }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});
