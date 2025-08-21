import { GraphQLResolveInfo } from 'graphql';
import { Usermodel } from 'src/models/user';
import { UserOtpModel } from 'src/models/user-otp.model';
import { requestSignup } from 'src/resolvers/mutations/auth/generate-otp';
import { sendOtpEmail } from 'src/utils/send-otp-email';

jest.mock('src/models/user', () => ({
  Usermodel: {
    findOne: jest.fn(),
  },
}));

jest.mock('src/models/user-otp.model', () => ({
  UserOtpModel: {
    findOneAndUpdate: jest.fn(),
  },
}));

jest.mock('src/utils/send-otp-email', () => ({
  sendOtpEmail: jest.fn(),
}));

describe('requestSignup', () => {
  const testEmail = 'test@example.com';

  it('should send OTP when email is not registered and otpType is create', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);
    (UserOtpModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ email: testEmail });
    (sendOtpEmail as jest.Mock).mockResolvedValue(undefined);

    const result = await requestSignup!({}, { email: testEmail, otpType: 'create' }, {}, {} as GraphQLResolveInfo);

    expect(Usermodel.findOne).toHaveBeenCalledWith({ email: testEmail });
    expect(UserOtpModel.findOneAndUpdate).toHaveBeenCalled();
    expect(sendOtpEmail).toHaveBeenCalledWith(testEmail, expect.any(String));
    expect(result).toEqual({
      input: testEmail,
      output: 'OTP sent to your email',
    });
  });

  it('should send OTP when email is registered and otpType is forgot', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue({ email: testEmail });
    (UserOtpModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ email: testEmail });
    (sendOtpEmail as jest.Mock).mockResolvedValue(undefined);

    const result = await requestSignup!({}, { email: testEmail, otpType: 'forgot' }, {}, {} as GraphQLResolveInfo);

    expect(Usermodel.findOne).toHaveBeenCalledWith({ email: testEmail });
    expect(UserOtpModel.findOneAndUpdate).toHaveBeenCalled();
    expect(sendOtpEmail).toHaveBeenCalledWith(testEmail, expect.any(String));
    expect(result).toEqual({
      input: testEmail,
      output: 'OTP sent to your email',
    });
  });

  it('should throw error if email is already registered and otpType is create', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue({ email: testEmail });

    await expect(requestSignup({}, { email: testEmail, otpType: 'create' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Email already registered');
  });

  it('should throw error if email is not found and otpType is forgot', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(requestSignup({}, { email: testEmail, otpType: 'forgot' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Email not found');
  });

  it('should throw error if otpType is invalid', async () => {
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(requestSignup({}, { email: testEmail, otpType: 'invalidType' as any }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP type');
  });
});
