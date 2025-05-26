const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

import { userModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { signIn } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('signIn', () => {
  const mockUser = {
    _id: 'user-id-123',
    email: 'test@example.com',
    password: 'hashed-password',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in successfully with correct credentials', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mock-jwt-token');

    const token = await signIn(null, {
      email: 'test@example.com',
      password: 'plain-password',
    });

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('plain-password', 'hashed-password');
    expect(jwt.sign).toHaveBeenCalledWith({ _id: 'user-id-123' }, JWT_SECRET, { expiresIn: '1d' });
    expect(token).toBe('mock-jwt-token');
  });

  it('should throw error if user is not found', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

    await expect(
      signIn(null, {
        email: 'wrong@example.com',
        password: 'any',
      })
    ).rejects.toThrow('email is not found');
  });

  it('should throw error if password is incorrect', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      signIn(null, {
        email: 'test@example.com',
        password: 'wrong-password',
      })
    ).rejects.toThrow('password is incorrect');
  });

  it('should use fallback secret when JWT_SECRET is undefined', async () => {
    const originalEnv = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;

    jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mock-fallback-token');

    const token = await signIn(null, {
      email: 'test@example.com',
      password: 'plain-password',
    });

    expect(jwt.sign).toHaveBeenCalledWith({ _id: 'user-id-123' }, 'mysecretkey', { expiresIn: '1d' });
    expect(token).toBe('mock-fallback-token');

    process.env.JWT_SECRET = originalEnv;
  });
});
