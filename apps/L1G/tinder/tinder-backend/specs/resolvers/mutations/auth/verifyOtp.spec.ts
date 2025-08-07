import { GraphQLResolveInfo } from 'graphql';
import { verifyOtp } from 'src/resolvers/mutations/auth';
import { UserOtpModel } from 'src/models/userOtp.model';

jest.mock('src/models/userOtp.model', () => ({
  UserOtpModel: {
    findOne: jest.fn(),
  },
}));

describe('verifyOtp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should verify OTP successfully', async () => {
    const testEmail = 'test@example.com';
    const testOtp = '1234';

    const mockSave = jest.fn();

    const mockData = {
      email: testEmail,
      otp: testOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      verified: false,
      save: mockSave,
    };

    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockData);

    const result = await verifyOtp!({}, { email: testEmail, otp: testOtp }, {}, {} as GraphQLResolveInfo);

    expect(UserOtpModel.findOne).toHaveBeenCalledWith({ email: testEmail });
    expect(mockSave).toHaveBeenCalled();
    expect(result).toEqual({
      input: testEmail,
      output: 'OTP verified successfully',
    });
  });

  it('should throw error if OTP is not found', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(verifyOtp!({}, { email: 'test@example.com', otp: '1234' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('No OTP request found');
  });

  it('should throw error if OTP is already verified', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue({
      verified: true,
    });

    await expect(verifyOtp!({}, { email: 'test@example.com', otp: '1234' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('OTP already verified');
  });

  it('should throw error if OTP is expired', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue({
      verified: false,
      expiresAt: new Date(Date.now() - 1000),
    });

    await expect(verifyOtp!({}, { email: 'test@example.com', otp: '1234' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('OTP expired');
  });

  it('should throw error if OTP is incorrect', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue({
      verified: false,
      expiresAt: new Date(Date.now() + 1000),
      otp: '5678',
    });

    await expect(verifyOtp!({}, { email: 'test@example.com', otp: '1234' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP');
  });
});
