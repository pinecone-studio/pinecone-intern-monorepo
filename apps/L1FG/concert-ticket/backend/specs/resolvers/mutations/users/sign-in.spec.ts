import { signIn } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import jwt from 'jsonwebtoken';

jest.mock('apps/L1FG/concert-ticket/backend/src/models', () => ({
  UserModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        _id: '1',
        email: 'zaya@example.com',
        password: 'hashedPassword',
      })
      .mockResolvedValueOnce({
        _id: '1',
        email: 'zaya@example.com',
        password: 'hashedPassword',
      }),
  },
}));

jest.mock('bcryptjs', () => ({
  compareSync: jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockedToken'),
}));

describe('signIn resolver', () => {
  it('throws "User email not found" when user does not exist', async () => {
    await expect(signIn!({}, { input: { email: 'zayahd@example.com', password: '0000' } }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('User email not found');
  });

  it('throws "password not match" when password is incorrect', async () => {
    await expect(signIn!({}, { input: { email: 'zaya@example.com', password: 'wrongPassword' } }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('password not match');
  });

  it('returns user and token when email and password are correct', async () => {
    const result = await signIn!({}, { input: { email: 'zaya@example.com', password: 'correctPassword' } }, { userId: null }, {} as GraphQLResolveInfo);

    expect(jwt.sign).toHaveBeenCalledWith({ userId: '1', email: 'zaya@example.com' }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    expect(result).toEqual({
      user: {
        _id: '1',
        email: 'zaya@example.com',
        password: 'hashedPassword',
      },
      token: 'mockedToken',
    });
  });
});
