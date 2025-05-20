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

  it('check email password', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    (jwt.sign as jest.Mock).mockReturnValue('mock-jwt-token');

    const token = await signIn(null, {
      email: 'test@example.com',
      password: 'plain-password',
    });

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('plain-password', 'hashed-password');
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 'user-id-123' }, expect.any(String), { expiresIn: '7d' });
    expect(token).toBe('mock-jwt-token');
  });

  it('if user not found', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

    await expect(
      signIn(null, {
        email: 'wrong@example.com',
        password: 'any',
      })
    ).rejects.toThrow('email is not found');
  });

  it('if password correct', async () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      signIn(null, {
        email: 'test@example.com',
        password: 'wrong-password',
      })
    ).rejects.toThrow('password is incorrect');
  });
});
