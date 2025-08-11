import { Usermodel } from 'src/models/user';
import bcrypt from 'bcryptjs';
import { MutationResolvers } from 'src/generated';
import { UserOtpModel } from 'src/models/user-otp.model';
import mongoose from 'mongoose';

function validateOtpId(otpId: string) {
  if (!mongoose.Types.ObjectId.isValid(otpId)) {
    throw new Error('Invalid OTP ID');
  }
}

async function getValidOtpRecord(otpId: string) {
  const otpRecord = await UserOtpModel.findOne({
    _id: otpId,
    otpType: 'create',
    verified: true,
    registered: false,
  });
  if (!otpRecord) throw new Error('OTP not verified or already used for signup');
  return otpRecord;
}

async function checkUserExists(email: string) {
  const existingUser = await Usermodel.findOne({ email });
  if (existingUser) throw new Error('Email already registered');
}

function validatePassword(password: string) {
  if (typeof password !== 'string' || password.trim() === '') {
    throw new Error('Password is required and must be a non-empty string');
  }
}

export const signup: MutationResolvers['signup'] = async (_, { otpId, password, genderPreferences, dateOfBirth, name, images, bio, interests, profession, schoolWork }) => {
  validateOtpId(otpId);

  const otpRecord = await getValidOtpRecord(otpId);

  const email = otpRecord.email;

  await checkUserExists(email);

  validatePassword(password);

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
