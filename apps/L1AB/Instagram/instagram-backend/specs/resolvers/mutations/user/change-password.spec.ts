import { GraphQLResolveInfo } from 'graphql';
import bcrypt from 'bcrypt';
import { otpModel, userModel } from '../../../../src/models';
import { changePassword } from '../../../../src/resolvers/mutations';

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
  genSalt: jest.fn(),
}));

describe('passwordChange', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if OTP is expired', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(changePassword!({}, { input: { email: 'test@gmail.com', password: 'newpassword', otp: 'expiredotp' } }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('OTP is expired');

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@gmail.com' });
    expect(userModel.updateOne).not.toHaveBeenCalled();
  });

  it('should throw an error if OTP does not match', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue({ email: 'test@gmail.com', otp: 'validotp' });

    await expect(changePassword!({}, { input: { email: 'test@gmail.com', password: 'newpassword', otp: 'invalidotp' } }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP');

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@gmail.com' });
    expect(userModel.updateOne).not.toHaveBeenCalled();
  });

  it('should successfully change the password', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue({ email: 'test@gmail.com', otp: 'validotp' });
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (userModel.updateOne as jest.Mock).mockResolvedValue({ modifiedCount: 1 });

    const result = await changePassword!({}, { input: { email: 'test@gmail.com', password: 'newpassword', otp: 'validotp' } }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({ success: true, message: 'successfully changed password' });

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: 'test@gmail.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', undefined);
    expect(userModel.updateOne).toHaveBeenCalledWith({ email: 'test@gmail.com' }, { password: 'hashedPassword' });
  });
});
