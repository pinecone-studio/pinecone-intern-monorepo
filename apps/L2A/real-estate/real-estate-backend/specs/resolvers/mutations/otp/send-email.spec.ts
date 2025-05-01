import { sendEmail } from 'apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations/otp/send-email';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

const sendMailMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (nodemailer.createTransport as jest.Mock).mockReturnValue({
    sendMail: sendMailMock,
  });
});

describe('sendEmail', () => {
  const to = 'user@example.com';
  const otp = '123456';

  it('should send email with correct parameters', async () => {
    sendMailMock.mockResolvedValueOnce({ messageId: 'mocked-id' });

    await sendEmail(to, otp);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    expect(sendMailMock).toHaveBeenCalledWith({
      from: `"Leave Request" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });
  });

  it('should throw an error and log it if email sending fails', async () => {
    const error = new Error('SMTP error');
    sendMailMock.mockRejectedValueOnce(error);
    await expect(sendEmail(to, otp)).rejects.toThrow('SMTP error');
  });
});
