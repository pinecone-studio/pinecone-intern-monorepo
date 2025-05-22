import { otpModel, userModel } from '../../../src/models';
import { OTP, OtpStep2, OtpStep3 } from '../../../src/resolvers/mutations';
import { hashPassword } from '../../../src/utils/hash-password';

jest.mock('../../../src/models', () => ({
  otpModel: {
    create: jest.fn(),
    findOne: jest.fn(),
    deleteMany: jest.fn(),
  },
  userModel: {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
  },
}));

jest.mock('../../../src/utils/send-otp', () => ({
  sendMail: jest.fn().mockResolvedValue(true),
}));

jest.mock('../../../src/utils/hash-password', () => ({
  hashPassword: jest.fn(),
}));

jest.mock('../../../src/utils/delete-old-otps', () => ({
  DeleteOldOTPs: jest.fn(),
}));

jest.mock('../../../src/utils/find-user-by-email', () => ({
  findUserByEmail: jest.fn().mockResolvedValue({ id: 'user-id', email: 'test@example.com' }),
}));

describe('OTP Mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create OTP and send mail', async () => {
    (otpModel.create as jest.Mock).mockResolvedValue({ otp: 123456 });

    const result = await OTP({}, { email: 'test@example.com' });

    expect(result).toEqual({ otp: 123456 });
  });

  it('should throw an error on step 1', async () => {
    (otpModel.create as jest.Mock).mockRejectedValue(new Error('chicken'));

    await expect(OTP({}, { email: 'test@example.com' })).rejects.toThrow('chicken');
  });

  it('should return existing OTP if valid', async () => {
    (otpModel.findOne as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        user: { email: 'test@example.com' },
        otp: '123456',
      }),
    });

    const result = await OtpStep2({}, { email: 'test@example.com', otp: '123456' });

    expect(result).toEqual({
      user: { email: 'test@example.com' },
      otp: '123456',
    });
  });

  it('should throw on invalid OTP', async () => {
    (otpModel.findOne as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });

    await expect(OtpStep2({}, { email: 'test@example.com', otp: '000000' })).rejects.toThrow('Нэг удаагийн код таарсангүй!');
  });

  it('should update user password and return user', async () => {
    (otpModel.findOne as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        user: { email: 'test@example.com' },
        otp: '123456',
      }),
    });

    (hashPassword as jest.Mock).mockResolvedValue('hashed');
    (userModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

    const result = await OtpStep3({}, { email: 'test@example.com', otp: '123456', password: 'newpass' });
    expect(result).toEqual({ email: 'test@example.com' });
  });

  it('should throw on bad OTP', async () => {
    (otpModel.findOne as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue(null),
    });
    await expect(OtpStep3({}, { email: 'test@example.com', otp: '000000', password: 'whatever' })).rejects.toThrow('Нэг удаагийн код таарсангүй!');
  });
});
