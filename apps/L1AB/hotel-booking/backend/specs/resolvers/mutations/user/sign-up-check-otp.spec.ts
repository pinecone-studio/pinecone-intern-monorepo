import { otpModel, userModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { SignUpCheckOtp } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/user/sign-up-check-otp';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  otpModel: {
    findOne: jest.fn(),
  },
}));

describe('Otp check Resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should check otp ', async () => {
    const mockInput = {
      email: 'test@gmail.com',
      otp: '1234',
    };
    (otpModel.findOne as jest.Mock).mockResolvedValue({ email: 'test@gmail.com', otp: '1234' });
    const result = await SignUpCheckOtp!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@gmail.com' });
    expect(result).toEqual({
      success: true,
      message: 'OTP verified successfully',
    });
  });

  it('should return error when OTP is invalid', async () => {
    const mockInput = {
      email: 'test@gmail.com',
      otp: '5678',
    };

    (otpModel.findOne as jest.Mock).mockResolvedValue({ email: 'test@gmail.com', otp: '1234' });

    await expect(SignUpCheckOtp!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP');

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@gmail.com' });
  });
  it('should return error for missing OTP', async () => {
    const mockInput = {
      email: 'test@gmail.com',
      otp: '5678',
    };

    (otpModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(SignUpCheckOtp!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('No OTP found for the provided email');

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@gmail.com' });
  });
});
