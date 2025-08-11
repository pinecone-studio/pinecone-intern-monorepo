import { MutationResolvers } from 'src/generated';
import { UserOtpModel } from 'src/models/user-otp.model';
import { Usermodel } from 'src/models/user';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const forgotPassword: MutationResolvers['forgotPassword'] = async (_, { otpId, Newpassword }) => {
  if (!mongoose.Types.ObjectId.isValid(otpId)) {
    throw new Error('Invalid OTP ID');
  }

  const otpRecord = await UserOtpModel.findOne({
    _id: otpId,
    otpType: 'forgot',
    verified: true,
    registered: false,
  });

  if (!otpRecord) {
    throw new Error('OTP not verified, expired, or already used');
  }

  const email = otpRecord.email;

  const user = await Usermodel.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  if (typeof Newpassword !== 'string' || Newpassword.trim() === '') {
    throw new Error('New password is required and must be a non-empty string');
  }

  const hashedPassword = await bcrypt.hash(Newpassword, 10);
  user.password = hashedPassword;

  const updatedUser = await user.save();

  otpRecord.registered = true;
  await otpRecord.save();

  return {
    id: updatedUser._id.toString(),
    email: updatedUser.email,
    name: updatedUser.name,
    genderPreferences: updatedUser.genderPreferences,
    dateOfBirth: updatedUser.dateOfBirth,
    bio: updatedUser.bio,
    interests: updatedUser.interests,
    profession: updatedUser.profession,
    schoolWork: updatedUser.schoolWork,
    images: updatedUser.images,
    likedBy: updatedUser.likedBy,
    likedTo: updatedUser.likedTo,
  };
};
