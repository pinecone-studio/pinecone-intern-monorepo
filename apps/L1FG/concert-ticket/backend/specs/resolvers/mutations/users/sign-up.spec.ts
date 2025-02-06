import { signUp } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        email: 'zaya',
        password: '0000',
      })
      .mockResolvedValueOnce(null),

    create: jest.fn().mockResolvedValueOnce({
      _id: '1',
      email: 'zaya',
      password: 'hashedPassword',
    }),
  },
}));

jest.mock('bcrypt', () => ({
  hashSync: jest.fn().mockResolvedValueOnce('hashedPassword'),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

describe('signUp', () => {
  it('user already exist', async () => {
    await expect(signUp!({}, { input: { email: '', password: '' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(new Error('User already exist'));
  });
  it('create user', async () => {
    const result = await signUp!({}, { input: { email: 'zaya', password: '0000' } }, { userId: null }, {} as GraphQLResolveInfo);

    expect(result).toEqual({ email: 'zaya', password: 'hashedPassword', _id: '1' });
  });
});
