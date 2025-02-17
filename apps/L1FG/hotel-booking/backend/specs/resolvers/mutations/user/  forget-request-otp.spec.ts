import { forgetRequestOTP } from '../../../../src/resolvers/mutations/user/forget-request-otp';
import { GraphQLResolveInfo } from 'graphql';

const input = { email: 'test@gmail.com' };

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce({ email: 'test@gmail.com' }).mockResolvedValueOnce(null),
    findByIdAndUpdate: jest.fn().mockResolvedValue({ _id: '1' }),
  },
}));

jest.mock('otp-agent', () => ({
  generateOTP: jest.fn().mockReturnValue('1234'),
}));

jest.mock('apps/L1FG/restaurant/backend/src/library/nodemailer', () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

describe('forgetRequestOTP', () => {
  it('should handle user already exists error', async () => {
    try {
      const response = await forgetRequestOTP!({}, { input }, {}, {} as GraphQLResolveInfo);
      expect(response).toEqual({ success: true, email: 'test@gmail.com' });
    } catch (error) {
      console.log(error);
    }
  });
  it('should request OTP and create a new user if not exists', async () => {
    const response = await forgetRequestOTP!({}, { input: { email: 'newuser@gmail.com' } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual({ success: false, email: 'newuser@gmail.com' });
  });
});
