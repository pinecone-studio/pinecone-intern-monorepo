import { userModel } from '../../../src/models';
import { login } from '../../../src/resolvers/mutations';
import { generateToken, verifyPassword } from '../../../src/utils/auth';

jest.mock('../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('../../../src/utils/auth', () => ({
  verifyPassword: jest.fn(),
  generateToken: jest.fn(),
}));

describe('login resolver', () => {
  const mockUser = {
    _id: '123',
    email: 'test@example.com',
    password: 'hashedpassword',
    isAdmin: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return token and user for valid credentials', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
    (verifyPassword as jest.Mock).mockResolvedValueOnce(true);
    (generateToken as jest.Mock).mockReturnValueOnce('fake-token');

    const result = await login(null, {
      email: 'test@example.com',
      password: 'correctpassword',
    });

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(verifyPassword).toHaveBeenCalledWith(mockUser, 'correctpassword');
    expect(result).toEqual({
      token: 'fake-token',
      user: mockUser,
    });
  });

  it('should throw error for invalid email', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      login(null, {
        email: 'wrong@example.com',
        password: 'anypassword',
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw error for invalid password', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
    (verifyPassword as jest.Mock).mockResolvedValueOnce(false);

    await expect(
      login(null, {
        email: 'test@example.com',
        password: 'wrongpassword',
      })
    ).rejects.toThrow('Invalid credentials');
  });
});
