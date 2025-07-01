import { userModel } from 'apps/L2B/tinder/tinder-backend/src/models';
import { forgotMatchOtp } from 'apps/L2B/tinder/tinder-backend/src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
  },
}));

describe('forgot-match-otp mutation', () => {
  const mockUser = {
    _id: '123',
    email: 'test@example.com',
    verficationCode: '1234',
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return "success" if OTP matches', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await forgotMatchOtp(null, { email: 'test@example.com', otp: '1234' });

    expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(result).toBe('success');
  });
  it('should return failed if OTP does not matc', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await forgotMatchOtp(null, { email: 'test@example.com', otp: '9999' });

    expect(result).toBe('failed');
  });

  it('should throw an error if user not found', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(forgotMatchOtp(null, { email: 'notfound@gmail.com', otp: '1234' })).rejects.toThrow('user not found');
  });
});
