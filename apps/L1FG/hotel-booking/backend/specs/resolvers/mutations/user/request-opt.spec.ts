import { requestOTP } from '../../../../src/resolvers/mutations/user/request-otp';
import { GraphQLResolveInfo } from 'graphql';

const input = { email: 'test@gmail.com' };

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce({ email: 'test@gmail.com' }).mockResolvedValueOnce(null),
    create: jest.fn().mockResolvedValue({ _id: '1' }),
  },
}));

jest.mock('otp-agent', () => ({
  generateOTP: jest.fn().mockReturnValue('1234'),
}));

jest.mock('apps/L1FG/restaurant/backend/src/library/nodemailer', () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

describe('requestOTP', () => {
  it('should handle user already exists error', async () => {
    try {
      const response = await requestOTP!({}, { input }, {}, {} as GraphQLResolveInfo);
      expect(response).toBe({ success: false, email: 'test@gmail.com' });
    } catch (error) {
      console.log(error);
    }
  });
  it('should request OTP and create a new user if not exists', async () => {
    const response = await requestOTP!({}, { input: { email: 'newuser@gmail.com' } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual({ success: true, email: 'newuser@gmail.com' });
  });
});
