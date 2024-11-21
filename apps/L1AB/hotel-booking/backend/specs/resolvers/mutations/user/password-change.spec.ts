import { otpModel, userModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import { passwordChange } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import bcrypt from 'bcrypt';

jest.mock('../../../../src/models', () => ({
  otpModel: {
    findOne: jest.fn(),
  },
  userModel: {
    updateOne: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('passwordChange', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if OTP is expired', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      passwordChange!({}, { input: { email: 'test@example.com', password: 'newpassword', otp: 'expiredotp' } }, {} as any, {} as GraphQLResolveInfo)
    ).rejects.toThrow('OTP is expired');

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(userModel.updateOne).not.toHaveBeenCalled();
  });

  it('should throw an error if OTP does not match', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com', otp: 'validotp' });

    await expect(
      passwordChange!({}, { input: { email: 'test@example.com', password: 'newpassword', otp: 'invalidotp' } }, {} as any, {} as GraphQLResolveInfo)
    ).rejects.toThrow('Invalid OTP');

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(userModel.updateOne).not.toHaveBeenCalled();
  });

  it('should successfully change the password', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com', otp: 'validotp' });
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (userModel.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });

    const result = await passwordChange!({}, { input: { email: 'test@example.com', password: 'newpassword', otp: 'validotp' } }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({ success: true, message: 'Your password successfully changed' });

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 10);
    expect(userModel.updateOne).toHaveBeenCalledWith({ email: 'test@example.com' }, { password: 'hashedPassword' });
  });
});
