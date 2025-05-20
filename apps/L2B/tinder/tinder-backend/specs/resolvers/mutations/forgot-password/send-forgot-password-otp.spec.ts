import { userModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { sendForgotOtp } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations';
import { sendEmail } from 'apps/L2B/tinder/tinder-backend/src/utils/send-email';

jest.mock('../../../../src/models', () => ({
  userModel: {
    updateOne: jest.fn(),
  },
}));

jest.mock('../../../../src/utils/send-email', () => ({
  sendEmail: jest.fn(),
}));

describe('send-forgot-password-otp mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user with verificationCode and send email', async () => {
    (userModel.updateOne as jest.Mock).mockResolvedValue({ acknowledged: true });

    const result = await sendForgotOtp(null, { email: 'test@example.com' });

    expect(userModel.updateOne).toHaveBeenCalledTimes(1);
    expect(userModel.updateOne).toHaveBeenCalledWith(
      { email: 'test@example.com' },
      {
        $set: {
          verficationCode: expect.any(String),
        },
      }
    );

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({
      email: 'test@example.com',
      content: expect.stringMatching(/<p>\d{4}<\/p>/),
      tittle: 'Your OTP code',
    });

    expect(result).toMatch(/^\d{4}$/);
  });
});
