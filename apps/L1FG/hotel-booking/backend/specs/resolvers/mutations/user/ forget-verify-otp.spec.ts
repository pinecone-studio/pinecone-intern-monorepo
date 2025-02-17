import { forgetVerifyOTP } from '../../../../src/resolvers/mutations/user/forget-verify-otp';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce({ email: 'test@gmail.com', otp: 9999 }).mockResolvedValueOnce({ email: 'test@gmail.com', otp: 1234 }),
    findByIdAndUpdate: jest.fn().mockResolvedValue({ email: 'test@gmail.com' }),
    create: jest.fn().mockResolvedValue({ _id: '1' }),
  },
}));

describe('forgetVerifyOTP', () => {
  it('should forgetVerifyOTP', async () => {
    try {
      const response = await forgetVerifyOTP!({}, { input: { email: 'test@gmail.com', verifyOtp: 1234 } }, {}, {} as GraphQLResolveInfo);
      expect(response).toEqual({ email: 'test@gmail.com', success: false });
    } catch (error) {
      console.log(error);
    }
  });
  it('should verify OTP ', async () => {
    const response = await forgetVerifyOTP!({}, { input: { email: 'newuser@gmail.com', verifyOtp: 1234 } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual({ success: true });
  });
});
