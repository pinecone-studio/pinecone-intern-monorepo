import { userModel } from '../../../src/models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signIn } from '../../../src/resolvers/mutations/sign-in';

jest.mock('../../../src/models', () => ({
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

describe('signIn', () => {
  const mockUser = {
    _id: 'userId123',
    email: 'test@gmail.com',
    password: 'hashedPassword',
  };

  it('succses eseh in successfully', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
    (jwt.sign as jest.Mock).mockReturnValue('fake-jwt-token');

    const result = await signIn({}, { email: 'test@gmail.com', password: '123' });

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@gmail.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('123', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser._id }, expect.any(String), { expiresIn: '7d' });

    expect(result).toEqual({
      message: 'succsess login',
      token: 'fake-jwt-token',
      user: mockUser,
    });
  });

  it('should throw error if user not found', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(signIn({}, { email: 'notfound@gmail.com', password: '123' })).rejects.toThrow('email is not found');
  });

  it('should throw error if password is incorrect', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    await expect(signIn({}, { email: 'test@gmail.com', password: 'wrongpass' })).rejects.toThrow('password is correct');
  });
});
