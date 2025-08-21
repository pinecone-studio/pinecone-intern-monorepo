import { MutationResolvers } from 'src/generated';
import { UserOtpModel } from 'src/models/user-otp.model';
import { Usermodel } from 'src/models/user';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

async function validateOtpRecord(otpId: string) {
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

  return otpRecord;
}

async function validateUserAndHashPassword(email: string, newPassword: string) {
  const user = await Usermodel.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  if (typeof newPassword !== 'string' || newPassword.trim() === '') {
    throw new Error('New password is required and must be a non-empty string');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  const updatedUser = await user.save();
  return updatedUser;
}

export const forgotPassword: MutationResolvers['forgotPassword'] = async (_, { otpId, newPassword }) => {
  const otpRecord = await validateOtpRecord(otpId);
  const updatedUser = await validateUserAndHashPassword(otpRecord.email, newPassword);

  await UserOtpModel.deleteOne({ _id: otpRecord._id });

  const userObject = updatedUser.toObject();
  userObject.id = updatedUser._id.toString();

  return {
    message: 'Password updated successfully',
    user: userObject,
  };
};
