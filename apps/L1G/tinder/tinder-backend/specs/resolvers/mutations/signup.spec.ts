import bcrypt from 'bcryptjs';
import { Usermodel } from 'src/models/user';
import { signup } from 'src/resolvers/mutations/signup';

jest.mock('bcryptjs');
jest.mock('src/models/user');

describe('signup resolver unit test', () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'password123';
  const mockName = 'Test User';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if email already exists', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue({ email: mockEmail });

    await expect(signup(null, { email: mockEmail, password: mockPassword, name: mockName })).rejects.toThrow('Email already exists');

    expect(Usermodel.findOne).toHaveBeenCalledWith({ email: mockEmail });
  });

  it('should create new user and return user info', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');

    const mockSave = jest.fn().mockResolvedValue({
      _id: { toString: () => 'user-id-123' },
      email: mockEmail,
      name: mockName,
      likedBy: [],
      likedTo: [],
    });

    (Usermodel as unknown as jest.Mock).mockImplementation(() => ({
      save: mockSave,
    }));

    const result = await signup(null, {
      email: mockEmail,
      password: mockPassword,
      name: mockName,
    });

    expect(Usermodel.findOne).toHaveBeenCalledWith({ email: mockEmail });
    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
    expect(mockSave).toHaveBeenCalled();

    expect(result).toEqual({
      id: 'user-id-123',
      email: mockEmail,
      name: mockName,
      likedBy: [],
      likedTo: [],
    });
  });

  it('should throw error on unknown failure', async () => {
    (Usermodel.findOne as jest.Mock).mockImplementation(() => {
      throw new Error('DB failure');
    });

    await expect(signup(null, { email: mockEmail, password: mockPassword, name: mockName })).rejects.toThrow('DB failure');
  });
});
