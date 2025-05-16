import bcrypt from 'bcryptjs';
import { USER_MODEL } from 'apps/L2A/real-estate/real-estate-backend/src/models/user';
import { resetPassword } from 'apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations/user/reset-password';
import { generateToken } from 'apps/L2A/real-estate/real-estate-backend/src/utils/jwt';

jest.mock('apps/L2A/real-estate/real-estate-backend/src/models/user');
jest.mock('apps/L2A/real-estate/real-estate-backend/src/utils/jwt');
jest.mock('bcryptjs');

describe('ResetPassword resolver', () => {
  const mockArgs = {
    email: 'test@example.com',
    password: 'securePassword123',
  };

  const mockExistingUser = {
    _id: '507f1f77bcf86cd799439011',
    email: 'test@example.com',
    isAdmin: false,
    password: undefined,
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (generateToken as jest.Mock).mockReturnValue('mockToken');
    (bcrypt.hashSync as jest.Mock).mockReturnValue('hashedPassword');
  });

  it('should complete signup successfully', async () => {
    const mockUpdatedUser = {
      ...mockExistingUser,
      password: 'hashedPassword',
    };

    (USER_MODEL.findOne as jest.Mock).mockResolvedValueOnce(mockExistingUser);
    (USER_MODEL.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

    const result = await resetPassword({}, mockArgs);

    expect(USER_MODEL.findOne).toHaveBeenCalledWith({ email: mockArgs.email });
    expect(bcrypt.hashSync).toHaveBeenCalledWith(mockArgs.password, 10);
    expect(USER_MODEL.findOneAndUpdate).toHaveBeenCalledWith({ email: mockArgs.email }, { password: 'hashedPassword' });
    expect(result).toEqual({
      user: {
        id: mockExistingUser._id.toString(),
        email: mockExistingUser.email,
        isAdmin: mockExistingUser.isAdmin,
      },
      token: 'mockToken',
    });
  });

  it('should throw error when user not found', async () => {
    (USER_MODEL.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(resetPassword({}, mockArgs)).rejects.toThrow('User not found');

    expect(USER_MODEL.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw error when update fails', async () => {
    (USER_MODEL.findOne as jest.Mock).mockResolvedValueOnce(mockExistingUser);
    (USER_MODEL.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(resetPassword({}, mockArgs)).rejects.toThrow('User update failed');
  });

  it('should handle database errors during find', async () => {
    (USER_MODEL.findOne as jest.Mock).mockRejectedValue(new Error('DB error'));

    await expect(resetPassword({}, mockArgs)).rejects.toThrow('DB error');
  });

  it('should handle database errors during update', async () => {
    (USER_MODEL.findOne as jest.Mock).mockResolvedValueOnce(mockExistingUser);
    (USER_MODEL.findOneAndUpdate as jest.Mock).mockRejectedValue(new Error('Update error'));

    await expect(resetPassword({}, mockArgs)).rejects.toThrow('Update error');
  });

  it('should handle empty email', async () => {
    (USER_MODEL.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(
      resetPassword(
        {},
        {
          email: '',
          password: mockArgs.password,
        }
      )
    ).rejects.toThrow('User not found');
  });

  it('should generate token with correct payload', async () => {
    const mockUpdatedUser = {
      ...mockExistingUser,
      password: 'hashedPassword',
    };

    (USER_MODEL.findOne as jest.Mock).mockResolvedValueOnce(mockExistingUser);
    (USER_MODEL.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

    await resetPassword({}, mockArgs);

    expect(generateToken).toHaveBeenCalledWith({
      id: mockExistingUser._id.toString(),
      email: mockExistingUser.email,
    });
  });

  it('should handle admin user role', async () => {
    const adminUser = {
      ...mockExistingUser,
      isAdmin: true,
      password: 'hashedPassword',
    };

    (USER_MODEL.findOne as jest.Mock).mockResolvedValueOnce({
      ...mockExistingUser,
      isAdmin: true,
    });
    (USER_MODEL.findOneAndUpdate as jest.Mock).mockResolvedValue(adminUser);

    const result = await resetPassword({}, mockArgs);

    expect(result.user.isAdmin).toBe(true);
  });
});
