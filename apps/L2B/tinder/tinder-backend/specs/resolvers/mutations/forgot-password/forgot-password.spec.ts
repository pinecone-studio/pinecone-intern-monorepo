import { userModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { forgotPassword } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations';
import bcrypt from 'bcrypt';
jest.mock('../../../../src/models', () => ({
  userModel: {
    findOneAndUpdate: jest.fn(),
  },
}));
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('forgot-password', () => {
  const email = 'test@example.com';
  const password = 'newpassword123';
  const hashedPassword = 'hashedpassword123';

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should hash the password and update user', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hashedPassword);
    const mockUser = { _id: 'user-id', email, password: hashedPassword };
    (userModel.findOneAndUpdate as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await forgotPassword(null, { email, password });

    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);

    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith({ email }, { $set: { password: hashedPassword } }, { new: true });
    expect(result).toBe(mockUser);
  });
  it('should throw error if user not found', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    (userModel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(forgotPassword(null, { email, password })).rejects.toThrow('user not found');
  });
});
