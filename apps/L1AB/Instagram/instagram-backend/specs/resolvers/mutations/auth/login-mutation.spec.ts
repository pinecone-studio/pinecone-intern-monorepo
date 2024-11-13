import { login } from '../../../../src/resolvers/mutations/auth/login';
import { userModel } from '../../../../src/models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('login resolver', () => {
  const mockUser = {
    _id: 'user123',
    username: 'testuser',
    email: 'test@example.com',
    password: '$2a$12$yEjN2.JZ0xrdCvZZ/Drw.eZ03V7DRRYum7cZXbZVt1lZGOn.GST4S',
  };

  const mockToken = 'mocked.jwt.token';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully login with username and return token', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const result = await login!(
      {},
      {
        username: 'testuser',
        email: '',
        password: 'password123',
      },
      {} as any,
      {} as any
    );

    expect(result).toEqual({
      token: mockToken,
      user: mockUser,
    });

    expect(userModel.findOne).toHaveBeenCalledWith({
      $or: [{ username: 'testuser' }, { email: '' }],
    });

    expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith({ ...mockUser }, expect.any(String));
  });

  it('should successfully login with email and return token', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const result = await login!(
      {},
      {
        username: '',
        email: 'test@example.com',
        password: 'password123',
      },
      {} as any,
      {} as any
    );

    expect(result).toEqual({
      token: mockToken,
      user: mockUser,
    });

    expect(userModel.findOne).toHaveBeenCalledWith({
      $or: [{ username: '' }, { email: 'test@example.com' }],
    });

    expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith({ ...mockUser }, expect.any(String));
  });

  it('should throw error when user is not found', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(login!({}, { username: 'nonexistent', email: '', password: 'password123' }, {} as any, {} as any)).rejects.toThrow('User not found');
  });

  it('should throw error when password is incorrect', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(login!({}, { username: 'testuser', email: '', password: 'wrongpassword' }, {} as any, {} as any)).rejects.toThrow('Username or password incorrect');
  });
});
