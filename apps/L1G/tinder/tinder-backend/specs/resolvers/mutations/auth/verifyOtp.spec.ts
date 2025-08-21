import { GraphQLResolveInfo } from 'graphql';
import { verifyOtp } from 'src/resolvers/mutations/auth/verify-otp';
import { UserOtpModel } from 'src/models/user-otp.model';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/user-otp.model', () => ({
  UserOtpModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('src/models/user', () => ({
  Usermodel: {
    findOne: jest.fn(),
  },
}));

describe('verifyOtp', () => {
  const email = 'test@example.com';
  const otpTypeCreate = 'create';
  const otpTypeForgot = 'forgot';
  const validOtp = '1234';
  const invalidOtp = '5678';

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should verify OTP successfully for "create" otpType', async () => {
    const mockSave = jest.fn();
    const mockOtpRecord = {
      email,
      otp: validOtp,
      otpType: otpTypeCreate,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      verified: false,
      registered: false,
      save: mockSave,
      _id: 'otpId123',
    };
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);
    const result = await verifyOtp!({}, { email, otp: validOtp, otpType: otpTypeCreate }, {}, {} as GraphQLResolveInfo);
    expect(UserOtpModel.findOne).toHaveBeenCalledWith({ email, otpType: otpTypeCreate });
    expect(Usermodel.findOne).toHaveBeenCalledWith({ email });
    expect(mockSave).toHaveBeenCalled();
    expect(result).toEqual({
      input: email,
      output: 'OTP verified successfully',
      otpId: 'otpId123',
    });
  });
  it('should verify OTP successfully for "forgot" otpType', async () => {
    const mockSave = jest.fn();
    const mockOtpRecord = {
      email,
      otp: validOtp,
      otpType: otpTypeForgot,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      verified: false,
      registered: false,
      save: mockSave,
      _id: 'otpId456',
    };
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);

    (Usermodel.findOne as jest.Mock).mockResolvedValue({ email });

    const result = await verifyOtp!({}, { email, otp: validOtp, otpType: otpTypeForgot }, {}, {} as GraphQLResolveInfo);

    expect(UserOtpModel.findOne).toHaveBeenCalledWith({ email, otpType: otpTypeForgot });
    expect(Usermodel.findOne).toHaveBeenCalledWith({ email });

    expect(mockSave).toHaveBeenCalled();
    expect(result).toEqual({
      input: email,
      output: 'OTP verified successfully',
      otpId: 'otpId456',
    });
  });

  it('throws error if no OTP record found', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(null);
    await expect(verifyOtp!({}, { email, otp: validOtp, otpType: otpTypeCreate }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('No OTP request found for this operation');
  });
  it('throws error if OTP is expired', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue({
      email,
      otp: validOtp,
      otpType: otpTypeCreate,
      expiresAt: new Date(Date.now() - 1000),
      verified: false,
      save: jest.fn(),
    });
    await expect(verifyOtp!({}, { email, otp: validOtp, otpType: otpTypeCreate }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('OTP expired');
  });
  it('throws error if OTP is invalid', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue({
      email,
      otp: 'differentOtp',
      otpType: otpTypeCreate,
      expiresAt: new Date(Date.now() + 10000),
      verified: false,
      save: jest.fn(),
    });
    await expect(verifyOtp!({}, { email, otp: invalidOtp, otpType: otpTypeCreate }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP');
  });
  it('throws error if otpType is invalid', async () => {
    const mockOtpRecord = {
      email,
      otp: validOtp,
      otpType: 'invalidType',
      expiresAt: new Date(Date.now() + 10000),
      verified: false,
      save: jest.fn(),
    };
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);
    await expect(verifyOtp!({}, { email, otp: validOtp, otpType: 'invalidType' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP type');
  });
  it('throws error if user exists for create OTP type', async () => {
    const mockOtpRecord = {
      email,
      otp: validOtp,
      otpType: otpTypeCreate,
      expiresAt: new Date(Date.now() + 10000),
      verified: false,
      save: jest.fn(),
    };
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);
    (Usermodel.findOne as jest.Mock).mockResolvedValue({ email }); // user exists
    await expect(verifyOtp!({}, { email, otp: validOtp, otpType: otpTypeCreate }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Email already registered');
  });
  it('throws error if user does not exist for forgot OTP type', async () => {
    const mockOtpRecord = {
      email,
      otp: validOtp,
      otpType: otpTypeForgot,
      expiresAt: new Date(Date.now() + 10000),
      verified: false,
      save: jest.fn(),
    };
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(verifyOtp!({}, { email, otp: validOtp, otpType: otpTypeForgot }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Email not registered');
  });
});
