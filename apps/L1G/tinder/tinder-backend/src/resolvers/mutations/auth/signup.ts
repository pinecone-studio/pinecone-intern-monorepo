import { Usermodel } from 'src/models/user';
import bcrypt from 'bcryptjs';
import { MutationResolvers } from 'src/generated';
import { UserOtpModel } from 'src/models/user-otp.model';
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
