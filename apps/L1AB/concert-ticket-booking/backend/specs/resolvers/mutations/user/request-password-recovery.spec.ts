import { GraphQLResolveInfo } from 'graphql';
import { requestPasswordRecovery } from 'apps/L1AB/concert-ticket-booking/backend/src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  otpModel: {
    create: jest.fn().mockResolvedValue({}),
  },
}));

jest.mock('../../../../src/library/nodemailer', () => ({
  sendEmail: jest.fn().mockResolvedValue({}),
}));

describe('Send Password Recovery Email', () => {
  it('it should send email', async () => {
    const response = await requestPasswordRecovery!({}, { input: { email: '' } }, { userId: null }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      success: true,
      email: '',
    });
  });
});
