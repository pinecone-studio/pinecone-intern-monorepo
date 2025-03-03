import { Gender } from '../../../../src/generated';
import { updateInfo } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/instagram/backend/src/models', () => ({
  UserModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        userName: 'dev',
        fullName: 'Bdev',
        bio: 'hello i am  dev',
        gender: 'female',
      })
      .mockResolvedValueOnce(null),
  },
}));

describe('updated info', () => {
  it('Should update info', async () => {
    if (!updateInfo) {
      return;
    }
    const result = await updateInfo({}, { input: { fullName: 'dev', userName: 'Bdev', bio: 'hello i am dev', gender: Gender.Female } }, { userId: '321' }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      userName: 'dev',
      fullName: 'Bdev',
      bio: 'hello i am  dev',
      gender: 'female',
    });
  });

  it('Should throw an authorization error', async () => {
    if (!updateInfo) {
      return;
    }

    await expect(updateInfo({}, { input: { fullName: 'Davaa', userName: 'Dagvadorj', bio: 'developer man hood', gender: Gender.Female } }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow(
      'Unauthorized'
    );
  });

  it('Should throw user not found error', async () => {
    if (!updateInfo) {
      return;
    }
    await expect(
      updateInfo({}, { input: { fullName: 'Davaa', userName: 'Dagvadorj', bio: 'developer man hood', gender: Gender.Female } }, { userId: '321' }, {} as GraphQLResolveInfo)
    ).rejects.toThrow('User not found');
  });
});
