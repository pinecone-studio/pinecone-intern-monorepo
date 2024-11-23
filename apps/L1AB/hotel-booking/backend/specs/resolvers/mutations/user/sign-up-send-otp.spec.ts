import { transporter } from 'apps/L1AB/hotel-booking/backend/src/library/nodemailer';
import { otpModel, userModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { signUpSendOtp } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
  },
  otpModel: {
    create: jest.fn(),
  },
}));

jest.mock('../../../../src/library/nodemailer', () => ({
  transporter: {
    sendMail: jest.fn(),
  },
}));

describe('signUpSendOtp Resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error response for invalid email format', async () => {
    const invalidEmail = 'invalid-email';
  
    const result = await signUpSendOtp!({}, { email: invalidEmail }, {} as any, {} as GraphQLResolveInfo);
  
    expect(result).toEqual({
      success: false,
      message: 'Invalid email format',
    });
  
    expect(userModel.findOne).not.toHaveBeenCalled();
    expect(otpModel.create).not.toHaveBeenCalled();
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });

  it('should return an error response when user already exists', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue({ email: 'existent@example.com' });
  
    await expect(
      signUpSendOtp!({}, { email: 'existent@example.com' }, {} as any, {} as GraphQLResolveInfo)
    ).resolves.toEqual({
      success: false,
      message: 'User already exists',
    });
  
    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'existent@example.com' });
    expect(otpModel.create).not.toHaveBeenCalled();
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });

  it('should send OTP successfully for a new user', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(null); 
    (otpModel.create as jest.Mock).mockResolvedValue({});
    (transporter.sendMail as jest.Mock).mockResolvedValue({});

    const result = await signUpSendOtp!({}, { email: 'nonexistent@example.com' }, {} as any, {} as GraphQLResolveInfo);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
    expect(otpModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'nonexistent@example.com',
        otp: expect.any(String),
      })
    );
    expect(transporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'nonexistent@example.com',
        subject: 'Password Reset OTP',
        text: expect.stringContaining('Your OTP for password reset is'),
      })
    );
    expect(result).toEqual({
      success: true,
      message: 'OTP sent successfully. Please check your email.',
    });
  });

});
