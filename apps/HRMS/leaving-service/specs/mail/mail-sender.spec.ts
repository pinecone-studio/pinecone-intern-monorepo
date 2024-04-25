import { sendMail } from '@/mail/mail-sender';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValueOnce({}).mockRejectedValueOnce({}),
  }),
}));
describe('sendMail', () => {
  it('success', async () => {
    const result = await sendMail('amoramgl@gmail.com', 'shit happened', 'andaa', 'Day', "2024-04-25");
    expect(result).toEqual({
      message: 'Email sent successfully',
    });
  });

  it('error', async () => {
    const result = await sendMail('amoramgl@gmail.com', 'shit happened', 'andaa', 'Day', "2024-04-25");
    expect(result).toEqual({
      error: 'Failed to send email',
    });
  });
});
