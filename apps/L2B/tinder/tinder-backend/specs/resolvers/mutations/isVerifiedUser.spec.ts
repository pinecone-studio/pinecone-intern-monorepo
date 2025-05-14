import { isVerified } from '../../../src/resolvers/mutations';
import { userModel } from '../../../src/models';

jest.mock('../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('isVerified', () => {
  const mockUser = {
    _id: '123',
    email: 'test@example.com',
    verficationCode: '123456',
    isVerified: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return "success" if OTP matches and update isVerified', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
    (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({
      ...mockUser,
      isVerified: true,
    });

    const result = await isVerified(null, { email: 'test@example.com', otp: '123456' });
    expect(result).toBe('success');
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { isVerified: true });
  });

  it('should return "failed" if OTP does not match', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce({
      _id: '123',
      email: 'test@example.com',
      verficationCode: '654321',
    });

    const result = await isVerified(null, { email: 'test@example.com', otp: '123456' });
    expect(result).toBe('failed');
    expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should throw error if user not found', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(isVerified(null, { email: 'notfound@example.com', otp: '123456' })).rejects.toThrow('failed to is verified user');
  });
});
