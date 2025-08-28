import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usermodel } from 'src/models/user';
import { login } from 'src/resolvers/mutations/auth/login';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('src/models/user');

describe('login resolver', () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';
  const mockHashedPassword = 'hashed_password';
  const mockUserId = 'user-id-123';
  const mockToken = 'mock-jwt-token';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('should throw if user is not found', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(login(null, { email: mockEmail, password: mockPassword })).rejects.toThrow('Invalid credentials');
  });

  it('should throw if password is invalid', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue({
      email: mockEmail,
      password: mockHashedPassword,
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(login(null, { email: mockEmail, password: mockPassword })).rejects.toThrow('Invalid credentials');
  });

  it('should throw if JWT_SECRET is not defined', async () => {
    const originalJwtSecret = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;

    (Usermodel.findOne as jest.Mock).mockResolvedValue({
      email: mockEmail,
      password: mockHashedPassword,
      _id: mockUserId,
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await expect(login(null, { email: mockEmail, password: mockPassword })).rejects.toThrow('JWT_SECRET is not defined in environment variables');

    process.env.JWT_SECRET = originalJwtSecret;
  });

  it('should return a valid token if login is successful', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue({
      email: mockEmail,
      password: mockHashedPassword,
      _id: mockUserId,
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const result = await login(null, { email: mockEmail, password: mockPassword });

    expect(Usermodel.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHashedPassword);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUserId, email: mockEmail }, 'test-secret', { expiresIn: '7d' });
    expect(result).toBe(mockToken);
  });
});
