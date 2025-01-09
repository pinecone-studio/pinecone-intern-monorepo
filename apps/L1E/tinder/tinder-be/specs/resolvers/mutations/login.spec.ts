import { login } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/user/user.model.ts', () => ({
  userModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({ _id: '1', email: 'test@example.com', password: 'hashedPassword' })
      .mockResolvedValueOnce({ _id: '2', email: 'test@example.com', password: 'hashedPassword' })
      .mockResolvedValueOnce(null),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false),
}));

describe('Login Mutation', () => {
  it('should log in a user with valid credentials', async () => {
    const response = await login!({}, { email: 'test@example.com', password: 'password123' });

    expect(response).toEqual({
      user: { _id: '1', email: 'test@example.com', password: 'hashedPassword' },
      token: 'token',
    });
  });

  it('should throw error if password is incorrect', async () => {
    try {
      await login!({}, { email: 'test@example.com', password: 'wrongpassword' });
    } catch (error) {
      expect(error).toEqual(new Error('Email or Password incorrect'));
    }
  });

  it('should throw error if user is not found', async () => {
    try {
      await login!({}, { email: 'nonexistent@example.com', password: 'password123' });
    } catch (error) {
      expect(error).toEqual(new Error('бүртгэлгүй байна!'));
    }
  });
});
