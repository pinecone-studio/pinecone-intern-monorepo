import { Usermodel } from 'src/models/user';
import { sendOtpEmail } from 'src/utils/sendOtpEmail';
import bcrypt from 'bcryptjs';
import { MutationResolvers } from 'src/generated';
import { UserOtpModel } from 'src/models/userOtp.model';

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

export const requestSignup = async (_: any, { email }: { email: string }) => {
  const existingUser = await Usermodel.findOne({ email });
  if (existingUser) throw new Error('Email already registered');

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await UserOtpModel.findOneAndUpdate({ email }, { otp, expiresAt, verified: false }, { upsert: true, new: true });

  await sendOtpEmail(email, otp);
  return 'OTP sent to your email';
};

export const verifyOtp = async (_: any, { email, otp }: { email: string; otp: string }) => {
  const record = await UserOtpModel.findOne({ email });
  if (!record) throw new Error('No OTP request found');
  if (record.verified) throw new Error('OTP already verified');
  if (record.expiresAt < new Date()) throw new Error('OTP expired');
  if (record.otp !== otp) throw new Error('Invalid OTP');

  record.verified = true;
  await record.save();
  return 'OTP verified successfully';
};

export const signup: MutationResolvers['signup'] = async (_, { password, genderPreferences, dateOfBirth, name, images, bio, interests, profession, schoolWork }) => {
  const otpRecord = await UserOtpModel.findOne({ verified: true, registered: false });

  if (!otpRecord) {
    throw new Error('OTP not verified or already used for signup');
  }

  const email = otpRecord.email;

  const existingUser = await Usermodel.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  if (typeof password !== 'string') {
    throw new Error('Password is required and must be a string');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new Usermodel({
    email,
    password: hashedPassword,
    genderPreferences,
    dateOfBirth,
    name,
    images,
    bio,
    interests,
    profession,
    schoolWork,
    likedBy: [],
    likedTo: [],
  });

  const savedUser = await user.save();

  otpRecord.registered = true;
  await otpRecord.save();

  return {
    id: savedUser._id.toString(),
    email: savedUser.email,
    name: savedUser.name,
    genderPreferences: savedUser.genderPreferences,
    dateOfBirth: savedUser.dateOfBirth,
    bio: savedUser.bio,
    interests: savedUser.interests,
    profession: savedUser.profession,
    schoolWork: savedUser.schoolWork,
    images: savedUser.images,
    likedBy: [],
    likedTo: [],
  };
};
