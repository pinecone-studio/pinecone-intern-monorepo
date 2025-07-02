import { signup, checkEmailExists } from 'src/resolvers/mutations/signup';
import { Usermodel } from 'src/models/user';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs');
jest.mock('src/models/user');

describe('signup resolver', () => {
  const mockArgs = {
    email: 'test@example.com',
    password: 'securePass',
    name: 'John Doe',
  };

  const mockSavedUser = {
    _id: { toString: () => '123' },
    email: 'test@example.com',
    name: 'John Doe',
    likedBy: [],
    likedTo: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully signs up a new user', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (Usermodel as unknown as jest.Mock).mockImplementation(function () {
      return {
        save: jest.fn().mockResolvedValue(mockSavedUser),
      };
    });

    const result = await signup({}, mockArgs);

    expect(result).toEqual({
      id: '123',
      email: 'test@example.com',
      name: 'John Doe',
      likedBy: [],
      likedTo: [],
    });

    expect(Usermodel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('securePass', 10);
  });

  it('throws an error if email already exists', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

    await expect(signup({}, mockArgs)).rejects.toThrow('Email already exists');
  });

  it('throws an error if save fails', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    (Usermodel as unknown as jest.Mock).mockImplementation(function () {
      return {
        save: jest.fn().mockRejectedValue(new Error('DB error')),
      };
    });

    await expect(signup({}, mockArgs)).rejects.toThrow('DB error');
  });

  it('throws an error if checkEmailExists throws', async () => {
    (Usermodel.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));
    await expect(signup({}, mockArgs)).rejects.toThrow('DB error');
  });

  it('handles undefined likedBy and likedTo on savedUser', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (Usermodel as unknown as jest.Mock).mockImplementation(function () {
      return {
        save: jest.fn().mockResolvedValue({
          _id: { toString: () => '123' },
          email: 'test@example.com',
          name: 'John Doe',
          likedBy: undefined,
          likedTo: undefined,
        }),
      };
    });
    const result = await signup({}, mockArgs);
    expect(result).toEqual({
      id: '123',
      email: 'test@example.com',
      name: 'John Doe',
      likedBy: [],
      likedTo: [],
    });
  });

  it('maps likedBy and likedTo when they have values', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (Usermodel as unknown as jest.Mock).mockImplementation(function () {
      return {
        save: jest.fn().mockResolvedValue({
          _id: { toString: () => '123' },
          email: 'test@example.com',
          name: 'John Doe',
          likedBy: [{ toString: () => 'a' }],
          likedTo: [{ toString: () => 'b' }],
        }),
      };
    });
    const result = await signup({}, mockArgs);
    expect(result).toEqual({
      id: '123',
      email: 'test@example.com',
      name: 'John Doe',
      likedBy: ['a'],
      likedTo: ['b'],
    });
  });
});

describe('checkEmailExists', () => {
  it('throws if email exists', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue({ email: 'exists@example.com' });
    await expect(checkEmailExists('exists@example.com')).rejects.toThrow('Email already exists');
  });
  it('resolves if email does not exist', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);
    await expect(checkEmailExists('new@example.com')).resolves.toBeUndefined();
  });
});
