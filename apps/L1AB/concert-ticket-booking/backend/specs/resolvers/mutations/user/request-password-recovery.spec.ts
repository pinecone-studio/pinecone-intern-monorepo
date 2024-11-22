import { GraphQLResolveInfo } from 'graphql';
import { requestPasswordRecovery } from 'apps/L1AB/concert-ticket-booking/backend/src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({ email: '' }),
  },
  otpModel: {
    create: jest.fn().mockResolvedValue({}),
  },
}));

jest.mock('../../../../src/library/nodemailer', () => ({
  sendEmail: jest.fn().mockResolvedValue({}),
}));

describe('Send Password Recovery Email', () => {
  it('should throw user not found error', async () => {
    try {
      await requestPasswordRecovery!({}, { input: { email: 'test1@gmail.com' } }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });

  it('it should send email', async () => {
    const response = await requestPasswordRecovery!({}, { input: { email: '' } }, { userId: null }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      success: true,
      email: '',
    });
  });
});
