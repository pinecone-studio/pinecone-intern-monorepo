import { transporter } from "apps/L1AB/hotel-booking/backend/src/library/nodemailer";
import { otpModel, userModel } from "apps/L1AB/hotel-booking/backend/src/models";
import { passwordRecoveryRequest } from "apps/L1AB/hotel-booking/backend/src/resolvers/mutations";
import { GraphQLResolveInfo } from "graphql";

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

describe('passwordRecoveryRequest resolver', () => {
  const mockUser = { email: 'test@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if user is not found', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      passwordRecoveryRequest!({}, { input: { email: 'nonexistent@example.com' } }, {} as any, {} as GraphQLResolveInfo)
    ).rejects.toThrow('User not found');

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
    expect(otpModel.create).not.toHaveBeenCalled();
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });

  it('should generate an OTP, save it, and send an email for an existing user', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (otpModel.create as jest.Mock).mockResolvedValue({});
    (transporter.sendMail as jest.Mock).mockResolvedValue({});

    const result = await passwordRecoveryRequest!({}, { input: { email: 'test@example.com' } }, {} as any, {} as GraphQLResolveInfo);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(otpModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        otp: expect.any(Number),
      })
    );
    expect(transporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'test@example.com',
        subject: 'Password Reset OTP',
        text: expect.stringContaining('Your OTP for password reset is'),
      })
    );
    expect(result).toEqual({
      success: true,
      message: 'OTP sent successfully. Please check your email.',
    });
  });

  it('should handle unexpected errors gracefully', async () => {
    (userModel.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(
      passwordRecoveryRequest!({}, { input: { email: 'test@example.com' } }, {} as any, {} as GraphQLResolveInfo)
    ).rejects.toThrow('Database error');

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(otpModel.create).not.toHaveBeenCalled();
    expect(transporter.sendMail).not.toHaveBeenCalled();
  });
});
