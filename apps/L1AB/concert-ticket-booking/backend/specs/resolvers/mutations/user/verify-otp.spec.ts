import { verifyOtp } from '../../../../src/resolvers/mutations';
import { accessTokenModel, otpModel } from '../../../../src/models';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  otpModel: {
    findOne: jest.fn(),
  },
  accessTokenModel: {
    create: jest.fn(),
  },
}));

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'mockedAccessToken'),
}));

describe('verifyOtp Resolver', () => {
  const mockInput = { email: 'test@example.com', otp: '123456' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should verify OTP successfully and return access token', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValueOnce({ otp: '123456' });

    const response = await verifyOtp!({}, { input: mockInput }, { userId: null }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      success: true,
      email: mockInput.email,
      accessToken: 'mockedAccessToken',
    });

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: mockInput.email });
    expect(accessTokenModel.create).toHaveBeenCalledWith({
      email: mockInput.email,
      accessToken: 'mockedAccessToken',
    });
  });

  it('should throw an error if OTP is not found', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(verifyOtp!({}, { input: mockInput }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('OTP expired or not found');

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: mockInput.email });
    expect(accessTokenModel.create).not.toHaveBeenCalled();
  });

  it('should throw an error if OTP is invalid', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValueOnce({ otp: '654321' });

    await expect(verifyOtp!({}, { input: mockInput }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP');

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: mockInput.email });
    expect(accessTokenModel.create).not.toHaveBeenCalled();
  });

  it('should handle database errors gracefully', async () => {
    (otpModel.findOne as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    await expect(verifyOtp!({}, { input: mockInput }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Database error');

    expect(otpModel.findOne).toHaveBeenCalledWith({ email: mockInput.email });
    expect(accessTokenModel.create).not.toHaveBeenCalled();
  });
});
