import { GraphQLResolveInfo } from 'graphql';
import { requestOtp } from '../../../src/resolvers/mutations';
import { otpModel } from '../../../src/models/user/otpmodel';
import nodemailer from 'nodemailer';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue('Email Sent'),
  }),
}));

jest.mock('../../../src/models/user/otpmodel', () => ({
  otpModel: {
    findOne: jest.fn(),
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

const mockOtp = {
  _id: '1',
  email: 'test@gmail.com',
  otp: '1234',
  expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('requestOtp resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new OTP and send an email', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue(null);
    (otpModel.create as jest.Mock).mockResolvedValue(mockOtp);

    const response = await requestOtp!({}, { input: { email: mockOtp.email, otp: '' } }, { req: undefined }, {} as GraphQLResolveInfo);

    // Assert that findOne was called with the correct email
    expect(otpModel.findOne).toHaveBeenCalledWith({ email: mockOtp.email });

    // Assert that create was called with the expected arguments
    expect(otpModel.create);

    // Assert that nodemailer createTransport was called
    expect(nodemailer.createTransport).toHaveBeenCalled();

    // Assert that sendMail was called with the correct options
    expect(nodemailer.createTransport().sendMail);

    // Assert that the response matches the expected format
    expect(response).toEqual({
      success: false,
      message: 'A new OTP has been generated and sent to your email.',
      email: mockOtp.email,
    });
  });

  it('should throw an error if OTP has expired', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue({
      ...mockOtp,
      expiresAt: new Date(Date.now() - 5 * 60 * 1000),
    });

    await expect(requestOtp!({}, { input: { email: mockOtp.email, otp: mockOtp.otp } }, { req: undefined }, {} as GraphQLResolveInfo)).rejects.toThrow('OTP has expired. Please request a new one.');

    expect(otpModel.deleteMany).toHaveBeenCalledWith({ email: mockOtp.email });
  });

  it('should throw an error if OTP is incorrect', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue(mockOtp);

    await expect(requestOtp!({}, { input: { email: mockOtp.email, otp: 'wrongOtp' } }, { req: undefined }, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP');

    expect(otpModel.deleteMany);
  });

  it('should validate OTP successfully', async () => {
    (otpModel.findOne as jest.Mock).mockResolvedValue(mockOtp);

    const response = await requestOtp!({}, { input: { email: mockOtp.email, otp: mockOtp.otp } }, { req: undefined }, {} as GraphQLResolveInfo);

    expect(otpModel.deleteMany).toHaveBeenCalledWith({ email: mockOtp.email });
    expect(response).toEqual({
      success: true,
      email: mockOtp.email,
      message: 'OTP successfully validated.',
    });
  });
});
