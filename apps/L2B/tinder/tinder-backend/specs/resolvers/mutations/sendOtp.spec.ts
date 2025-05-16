import { userModel } from '../../../src/models';
import { sendOTP } from '../../../src/resolvers/mutations';
import { sendEmail } from '../../../src/utils/send-email';

jest.mock('../../../src/models', () => ({
  userModel: {
    create: jest.fn(),
  },
}));
jest.mock('../../../src/utils/send-email', () => ({
  sendEmail: jest.fn(),
}));
describe('sendOTP mutation', () => {
  const mockUser = { _id: '123', email: 'test@example.com', verficationCode: '1234' };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should create a user and send email with OTP', async () => {
    (userModel.create as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await sendOTP(null, { email: 'test@example.com' });

    expect(userModel.create).toHaveBeenCalledTimes(1);
    expect(userModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        verficationCode: expect.any(String),
      })
    );

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({
      email: 'test@example.com',
      content: expect.stringContaining('<p'),
      tittle: 'Your otp code',
    });

    expect(result).toEqual(mockUser);
  });
  it('should throw error if something fails', async () => {
    (userModel.create as jest.Mock).mockRejectedValueOnce(new Error('failed to send otp mutation'));
    await expect(sendOTP(null, { email: 'test@gmail.com' })).rejects.toThrow('failed to send otp mutation');
  });
});
