import { requestOtp } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({ email: 'test@gmail.com' }),
  },
  otpModel: {
    create: jest.fn().mockResolvedValue({}),
  },
}));

jest.mock('../../../../src/app/library/nodemailer', () => ({
  sendEmail: jest.fn().mockResolvedValue({}),
}));

describe('Send Password Recovery Email', () => {
  it('should throw user not found error', async () => {
    try {
      await requestOtp!({}, { input: { email: 'test@gmail.com' } }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });

  it('it should send email', async () => {
    const response = await requestOtp!({}, { input: { email: 'test@gmail.com' } }, { userId: null }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      success: true,
      email: 'test@gmail.com',
    });
  });
});
