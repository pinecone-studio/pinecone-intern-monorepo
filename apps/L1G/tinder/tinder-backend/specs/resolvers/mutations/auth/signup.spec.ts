import { GraphQLResolveInfo } from 'graphql';
import { signup } from 'src/resolvers/mutations/auth/signup';
import bcrypt from 'bcryptjs';
import { UserOtpModel } from 'src/models/user-otp.model';
import { Usermodel } from 'src/models/user';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

jest.mock('bcryptjs', () => ({ hash: jest.fn() }));
jest.mock('jsonwebtoken', () => ({ sign: jest.fn() }));
jest.mock('src/models/user-otp.model', () => ({
  UserOtpModel: { findOne: jest.fn() },
}));
jest.mock('src/models/user', () => {
  const mockSave = jest.fn();
  const mockConstructor = jest.fn().mockImplementation(function (this: any, data: any) {
    Object.assign(this, data);
    this.save = mockSave;
    return this;
  });
  return {
    Usermodel: Object.assign(mockConstructor, {
      findOne: jest.fn(),
    }),
  };
});
jest.mock('mongoose', () => {
  const originalMongoose = jest.requireActual('mongoose');
  return {
    ...originalMongoose,
    Types: {
      ObjectId: {
        isValid: jest.fn(),
      },
    },
  };
});

describe('signup', () => {
  const baseArgs = {
    otpId: 'validOtpId123',
    password: 'password123',
    genderPreferences: 'male',
    dateOfBirth: '2003/12/25',
    name: 'testAccount',
    images: ['image1'],
    bio: 'hud2',
    interests: ['bhgu'],
    profession: 'student',
    schoolWork: 'pinecone',
  };

  const mockOtp = {
    _id: baseArgs.otpId,
    email: 'test@example.com',
    otpType: 'create',
    verified: true,
    registered: false,
    save: jest.fn(),
  };

  const mockUser = {
    _id: 'mocked_user_id',
    email: mockOtp.email,
    password: 'hashed-password',
    likedBy: [],
    likedTo: [],
    matchIds: [],
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValue(true);
    process.env.JWT_SECRET = 'test-secret';
  });

  it('throws if otpId is invalid', async () => {
    (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValue(false);

    await expect(signup!({}, baseArgs, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid OTP ID');

    expect(UserOtpModel.findOne).not.toHaveBeenCalled();
  });

  it('signs up successfully', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtp);
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    (jwt.sign as jest.Mock).mockReturnValue('mocked-jwt-token');

    // Mock user save to resolve with the user object
    const mockSaveUser = jest.fn().mockResolvedValue(mockUser);
    (Usermodel as any).mockImplementation(function (this: any, data: any) {
      Object.assign(this, data);
      this.save = mockSaveUser;
      return this;
    });

    const result = await signup!({}, baseArgs, {}, {} as GraphQLResolveInfo);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(baseArgs.otpId);
    expect(UserOtpModel.findOne).toHaveBeenCalledWith({
      _id: baseArgs.otpId,
      otpType: 'create',
      verified: true,
      registered: false,
    });
    expect(Usermodel.findOne).toHaveBeenCalledWith({ email: mockOtp.email });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(mockSaveUser).toHaveBeenCalled();
    expect(mockOtp.save).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: mockUser._id.toString(), email: mockUser.email },
      'test-secret',
      { expiresIn: '7d' }
    );

    // The actual signup function only returns id, email, and token
    expect(result).toEqual({
      id: mockUser._id.toString(),
      email: mockUser.email,
      token: 'mocked-jwt-token',
    });
  });

  it('throws if OTP not verified or already used', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(signup!({}, baseArgs, {}, {} as GraphQLResolveInfo)).rejects.toThrow('OTP not verified or already used for signup');
  });

  it('throws if email is already registered', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtp);
    (Usermodel.findOne as jest.Mock).mockResolvedValue({ email: mockOtp.email });

    await expect(signup!({}, baseArgs, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Email already registered');
  });

  it('throws if password is not a string', async () => {
    (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValue(true);
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtp);
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(signup!({}, { ...baseArgs, password: null as any }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Password is required and must be a non-empty string');
  });

  it('throws if password is empty string or whitespace only', async () => {
    (mongoose.Types.ObjectId.isValid as jest.Mock).mockReturnValue(true);
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtp);
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(signup!({}, { ...baseArgs, password: '   ' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Password is required and must be a non-empty string');
  });
});