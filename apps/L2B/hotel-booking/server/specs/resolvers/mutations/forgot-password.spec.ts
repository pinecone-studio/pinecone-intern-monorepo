import { userModel } from '../../../src/models';
import { OTP } from '../../../src/models/otp.model';
import { requestPasswordReset, resetPassword, verifyPasswordResetOTP } from '../../../src/resolvers/mutations';
import { hashPassword } from '../../../src/utils/auth';
import { sendOTPEmail } from '../../../src/utils/email';
import { generateOTP, verifyOTP } from '../../../src/utils/otp';

jest.mock('../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
    prototype: {
      save: jest.fn(),
    },
  },
}));

jest.mock('../../../src/models/otp.model', () => ({
  OTP: {
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

jest.mock('../../../src/utils/email', () => ({
  sendOTPEmail: jest.fn(),
}));

jest.mock('../../../src/utils/otp', () => ({
  generateOTP: jest.fn(),
  verifyOTP: jest.fn(),
}));

jest.mock('../../../src/utils/auth', () => ({
  hashPassword: jest.fn(),
}));

describe('passwordReset resolvers', () => {
  const mockUser = {
    _id: '123',
    email: 'test@example.com',
    password: 'oldpassword',
    save: jest.fn(),
  };
  const mockOTP = {
    email: 'test@example.com',
    otp: '123456',
    expiresAt: new Date(Date.now() + 900000),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('requestPasswordReset', () => {
    it('should send OTP email for valid user', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
      (generateOTP as jest.Mock).mockReturnValueOnce('123456');
      (OTP.findOneAndUpdate as jest.Mock).mockResolvedValueOnce(mockOTP);
      (sendOTPEmail as jest.Mock).mockResolvedValueOnce(true);

      const result = await requestPasswordReset(null, { email: 'test@example.com' });

      expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(generateOTP).toHaveBeenCalled();
      expect(OTP.findOneAndUpdate).toHaveBeenCalledWith({ email: 'test@example.com' }, { otp: '123456', expiresAt: expect.any(Date) }, { upsert: true, new: true });
      expect(sendOTPEmail).toHaveBeenCalledWith('test@example.com', '123456');
      expect(result).toEqual({
        success: true,
        message: 'OTP sent successfully',
      });
    });

    it('should throw error for non-existent user', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        requestPasswordReset(null, {
          email: 'nonexistent@example.com',
        })
      ).rejects.toThrow('Email not found');
    });
  });

  describe('verifyPasswordResetOTP', () => {
    it('should verify valid OTP', async () => {
      (verifyOTP as jest.Mock).mockResolvedValueOnce(true);

      const result = await verifyPasswordResetOTP(null, {
        email: 'test@example.com',
        otp: '123456',
      });

      expect(verifyOTP).toHaveBeenCalledWith('test@example.com', '123456');
      expect(result).toEqual({
        success: true,
        message: 'OTP verified successfully',
      });
    });

    it('should throw error for invalid OTP', async () => {
      (verifyOTP as jest.Mock).mockResolvedValueOnce(false);

      await expect(
        verifyPasswordResetOTP(null, {
          email: 'test@example.com',
          otp: 'wrongotp',
        })
      ).rejects.toThrow('Invalid OTP');
    });
  });

  describe('resetPassword', () => {
    it('should reset password for valid user', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
      (hashPassword as jest.Mock).mockResolvedValueOnce('newhashedpassword');
      mockUser.save.mockResolvedValueOnce(true);

      const result = await resetPassword(null, {
        email: 'test@example.com',
        password: 'newpassword',
      });

      expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(hashPassword).toHaveBeenCalledWith('newpassword');
      expect(mockUser.password).toBe('newhashedpassword');
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
        message: 'Password reset successfully',
      });
    });

    it('should throw error for non-existent user', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        resetPassword(null, {
          email: 'nonexistent@example.com',
          password: 'newpassword',
        })
      ).rejects.toThrow('User not found');
    });
  });
});
