import { forgotPassword } from 'src/resolvers/mutations/auth/forgot-password';
import { UserOtpModel } from 'src/models/user-otp.model';
import { Usermodel } from 'src/models/user';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

jest.mock('src/models/user-otp.model');
jest.mock('src/models/user');
jest.mock('bcryptjs');

describe('forgotPassword resolver', () => {
  const mockOtpId = new mongoose.Types.ObjectId().toString();
  const mockEmail = 'test@example.com';
  const mockNewPassword = 'newStrongPass123';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('throws error if otpId is invalid', async () => {
    jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockImplementation((id) => {
      return id !== 'invalid-id';
    });

    await expect(forgotPassword(null, { otpId: 'invalid-id', Newpassword: mockNewPassword })).rejects.toThrow('Invalid OTP ID');
  });

  it('throws error if OTP record not found or invalid', async () => {
    (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValue(true);
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(forgotPassword(null, { otpId: mockOtpId, Newpassword: mockNewPassword })).rejects.toThrow('OTP not verified, expired, or already used');
  });

  it('throws error if user not found', async () => {
    (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValue(true);
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue({ _id: mockOtpId, email: mockEmail, otpType: 'forgot', verified: true, registered: false, save: jest.fn() });
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(forgotPassword(null, { otpId: mockOtpId, Newpassword: mockNewPassword })).rejects.toThrow('User not found');
  });

  it('throws error if new password is invalid', async () => {
    (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValue(true);
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue({ _id: mockOtpId, email: mockEmail, otpType: 'forgot', verified: true, registered: false, save: jest.fn() });
    (Usermodel.findOne as jest.Mock).mockResolvedValue({ save: jest.fn() });

    await expect(forgotPassword(null, { otpId: mockOtpId, Newpassword: '' })).rejects.toThrow('New password is required and must be a non-empty string');
  });

  it('successfully updates password and marks otp as registered', async () => {
    const mockSaveUser = jest.fn().mockResolvedValue({
      _id: mockOtpId,
      email: mockEmail,
      name: 'John',
      genderPreferences: 'female',
      dateOfBirth: '1990-01-01',
      bio: 'Hello',
      interests: ['coding'],
      profession: 'dev',
      schoolWork: 'university',
      images: ['img1.jpg'],
      likedBy: [],
      likedTo: [],
    });

    const mockOtpRecord = {
      _id: mockOtpId,
      email: mockEmail,
      otpType: 'forgot',
      verified: true,
      registered: false,
      save: jest.fn().mockResolvedValue(true),
    };

    (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValue(true);
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);
    (Usermodel.findOne as jest.Mock).mockResolvedValue({ save: mockSaveUser });
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    const result = await forgotPassword(null, { otpId: mockOtpId, Newpassword: mockNewPassword });

    expect(bcrypt.hash).toHaveBeenCalledWith(mockNewPassword, 10);
    expect(mockSaveUser).toHaveBeenCalled();
    expect(mockOtpRecord.registered).toBe(true);
    expect(mockOtpRecord.save).toHaveBeenCalled();
    expect(result.email).toBe(mockEmail);
    expect(result.name).toBe('John');
  });
});
