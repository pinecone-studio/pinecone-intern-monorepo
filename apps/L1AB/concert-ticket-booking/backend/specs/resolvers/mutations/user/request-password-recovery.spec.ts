import { GraphQLResolveInfo } from 'graphql';
import { requestPasswordRecovery } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn().mockResolvedValueOnce({ userId: 'someUserId', email: 'test@example.com' }).mockResolvedValueOnce(null),
  },
  otpModel: {
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
  },
}));

jest.mock('../../../../src/library/nodemailer', () => ({
  sendEmail: jest.fn().mockResolvedValueOnce({}).mockRejectedValueOnce({}),
}));

describe('Send Password Recovery Email', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('it should send email', async () => {
    const response = await requestPasswordRecovery!({}, { input: { email: 'test@example.com' } }, { userId: 'someUserId' }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      success: true,
      email: 'test@example.com',
    });
  });
  it('should throw user not found error', async () => {
    try {
      await requestPasswordRecovery!({}, { input: { email: 'test@example.com' } }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });
});
