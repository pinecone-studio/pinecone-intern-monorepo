import { login } from 'src/resolvers/mutations/user/login';  // өөрийн файлын замыг зөв оруулна уу
import { User } from 'src/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from 'src/utils/check-jwt';

jest.mock('src/models');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('src/utils/check-jwt', () => ({
  getJwtSecret: jest.fn(),
}));

describe('login mutation', () => {
  const mockInput = {
    email: 'test@example.com',
    password: 'password123',
  };

  beforeAll(() => {
    process.env.JWT_SECRET = 'testsecret';
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully with correct credentials', async () => {
    (getJwtSecret as jest.Mock).mockReturnValue('testsecret');
    (User.findOne as jest.Mock).mockResolvedValue({
      _id: 'user-id-123',
      email: mockInput.email,
      password: 'hashed-password',
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    (jwt.sign as jest.Mock).mockReturnValue('mock-token');

    const result = await login!(null as any, { input: mockInput }, null as any, null as any);

    expect(User.findOne).toHaveBeenCalledWith({ email: mockInput.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(mockInput.password, 'hashed-password');
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 'user-id-123' }, 'testsecret');

    expect(result).toEqual({
      success: true,
      message: "Login successful",
      user: {
        _id: 'user-id-123',
        email: mockInput.email,
        password: 'hashed-password',
      },
      token: 'mock-token',
    });
  });

  it('should throw error if user not found', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(login!(null as any, { input: mockInput }, null as any, null as any))
      .rejects.toThrow('Invalid credentials');
  });
  it('should throw error if JWT_SECRET is not configured', async () => {
    (getJwtSecret as jest.Mock).mockImplementation(() => {
      throw new Error('JWT_SECRET not configured');
    });

    (User.findOne as jest.Mock).mockResolvedValue({
      _id: 'user-id-123',
      email: mockInput.email,
      password: 'hashed-password',
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await expect(login!(null as any, { input: mockInput }, null as any, null as any))
      .rejects.toThrow('JWT_SECRET not configured');
  });
  it('should throw error if password does not match', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      _id: 'user-id-123',
      email: mockInput.email,
      password: 'hashed-password',
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(login!(null as any, { input: mockInput }, null as any, null as any))
      .rejects.toThrow('Invalid credentials');
  });

  it('should throw error if email is missing', async () => {
    await expect(login!(null as any, { input: { password: '123' } as any }, null as any, null as any))
      .rejects.toThrow('Email is required');
  });

  it('should throw error if password is missing', async () => {
    await expect(login!(null as any, { input: { email: 'test@example.com' } as any }, null as any, null as any))
      .rejects.toThrow('Password is required');
  });
  it('should throw generic "Login failed" error for unknown error types', async () => {
    (User.findOne as jest.Mock).mockImplementation(() => {
      throw "some string error";
    });

    await expect(login!(null as any, { input: mockInput }, null as any, null as any))
      .rejects.toThrow('Login failed');
  });
});
