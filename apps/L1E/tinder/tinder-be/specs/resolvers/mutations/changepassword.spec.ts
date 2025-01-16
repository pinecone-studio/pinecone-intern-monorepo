import bcrypt from 'bcrypt';
import { otpModel } from '../../../src/models/user/otpmodel';
import { userModel } from '../../../src/models/user/user.model';
import { changePassword } from '../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../src/models/user/otpmodel.ts');
jest.mock('../../../src/models/user/user.model.ts');
jest.mock('bcrypt');

describe('changePassword Resolver', () => {
  const mockEmail = 'test@example.com';
  const mockPassword = 'NewSecurePassword1!';
  const mockOtp = '1234';
  const hashedPassword = 'hashedpassword';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully change the password when OTP is valid', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue({
      email: mockEmail,
      otp: mockOtp,
    });

    (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    (userModel.updateOne as jest.Mock).mockResolvedValue({ acknowledged: true });

    const input = { email: mockEmail, password: mockPassword, otp: mockOtp };

    if (changePassword) {
      const result = await changePassword({}, { input }, { req: undefined }, {} as GraphQLResolveInfo);
      expect(otpModel.findOne).toHaveBeenCalledWith({ email: mockEmail });
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 'salt');
      expect(userModel.updateOne).toHaveBeenCalledWith({ email: mockEmail }, { password: hashedPassword });
      expect(result).toEqual({
        success: true,
        message: 'successfully changed password',
      });
    } else {
      throw new Error('changePassword is undefined');
    }
  });

  it('should throw an error if OTP is expired', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue(null);

    const input = { email: mockEmail, password: mockPassword, otp: mockOtp };

    if (changePassword) {
      await expect(changePassword({}, { input }, { req: undefined }, {} as GraphQLResolveInfo)).rejects.toThrow('OTP is expired');
      expect(otpModel.findOne).toHaveBeenCalledWith({ email: mockEmail });
      expect(userModel.updateOne).not.toHaveBeenCalled();
    }
  });

  it('should throw an error if OTP is invalid', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue({
      email: mockEmail,
      otp: 'wrongOtp',
    });

    const input = { email: mockEmail, password: mockPassword, otp: mockOtp };

    if (changePassword) {
      await expect(changePassword({}, { input }, { req: undefined }, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP');
      expect(otpModel.findOne).toHaveBeenCalledWith({ email: mockEmail });
      expect(userModel.updateOne).not.toHaveBeenCalled();
    }
  });
});
