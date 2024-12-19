import { signIn } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/user/sign-in';
import { GraphQLResolveInfo } from 'graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../../../../src/models';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('signIn resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in successfully', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce({
      _id: '1',
      email: 'test@example.com',
      password: 'hashed_password',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
    (jwt.sign as jest.Mock).mockReturnValue('token');

    const response = await signIn!({}, { input: { email: 'test@example.com', password: 'password' } }, {} as any, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      user: {
        _id: '1',
        email: 'test@example.com',
        password: 'hashed_password',
      },
      token: 'token',
    });
    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashed_password');
    expect(jwt.sign).toHaveBeenCalledWith({ user: '1' }, 'secret');
  });

  it('should fail when user is not found', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(signIn!({}, { input: { email: 'nonexistent@example.com', password: 'password' } }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');
    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
  });

  it('should fail when password does not match', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce({
      _id: '1',
      email: 'test@example.com',
      password: 'hashed_password',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    await expect(signIn!({}, { input: { email: 'test@example.com', password: 'wrong_password' } }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Password or email is incorrect');
    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('wrong_password', 'hashed_password');
  });
});
