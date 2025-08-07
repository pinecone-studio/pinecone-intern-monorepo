import { GraphQLResolveInfo } from 'graphql';
import { Usermodel } from 'src/models/user';
import { UserOtpModel } from 'src/models/userOtp.model';
import { requestSignup } from 'src/resolvers/mutations/auth';
import { sendOtpEmail } from 'src/utils/sendOtpEmail';

jest.mock('src/models/user', () => ({
  Usermodel: {
    findOne: jest.fn(),
  },
}));

jest.mock('src/models/userOtp.model', () => ({
  UserOtpModel: {
    findOneAndUpdate: jest.fn(),
  },
}));

jest.mock('src/utils/sendOtpEmail', () => ({
  sendOtpEmail: jest.fn(),
}));

describe('requestSignup', () => {
  it('should send OTP when email is not registered', async () => {
    const testEmail = 'test@example.com';

    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);

    (UserOtpModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ email: testEmail });

    (sendOtpEmail as jest.Mock).mockResolvedValue(undefined);

    const result = await requestSignup!({}, { email: testEmail }, {}, {} as GraphQLResolveInfo);

    expect(Usermodel.findOne).toHaveBeenCalledWith({ email: testEmail });
    expect(UserOtpModel.findOneAndUpdate).toHaveBeenCalled();
    expect(sendOtpEmail).toHaveBeenCalledWith(testEmail, expect.any(String)); // OTP нь random

    expect(result).toEqual({
      input: testEmail,
      output: 'OTP sent to your email',
    });
  });

  it('should throw error if email is already registered', async () => {
    const testEmail = 'test@example.com';

    (Usermodel.findOne as jest.Mock).mockResolvedValue({ email: testEmail });

    if (!requestSignup) throw new Error('requestSignup is undefined');
    await expect(requestSignup({}, { email: testEmail }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Email already registered');
  });
});
