import { GraphQLResolveInfo } from 'graphql';
import { login } from '../../../../src/resolvers/mutations/user/login';

jest.mock('../../../../src/models/user.model.ts', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValue({
      _id: '1',
      name: 'aa',
      email: 'aa',
      phone: '0000',
      password: '0000',
    }),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValueOnce(false).mockResolvedValue(true),
}));

describe('login', () => {
  const mockInput = { email: 'aa', password: 'aa' };
  it('1.email should not login', async () => {
    await expect(
      login!(
        {},
        { input: mockInput },
        {
          userId: null,
        },
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Хэрэглэгч олдсонгүй');
  });
  it('2.should password incorrect', async () => {
    await expect(
      login!(
        {},
        { input: { email: 'aa', password: 'a' } },
        {
          userId: null,
        },
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Нууц үг алдаатай байна');
  });

  it('3.should user login', async () => {
    await expect(
      login!(
        {},
        { input: mockInput },
        {
          userId: null,
        },
        {} as GraphQLResolveInfo
      )
    ).resolves.toEqual({
      user: {
        _id: '1',
        name: 'aa',
        email: 'aa',
        phone: '0000',
        password: '0000',
      },
      token: 'token',
    });
  });
});
