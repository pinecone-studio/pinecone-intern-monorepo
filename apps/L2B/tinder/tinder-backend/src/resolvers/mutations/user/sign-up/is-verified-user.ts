import { userModel } from '../../../../models';

export const isVerified = async (_: unknown, { email, otp }: { email: string; otp: string }) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('user not found');
    }

    if (String(user.verficationCode) === String(otp)) {
      await userModel.findByIdAndUpdate(user._id, { isVerified: true });
      return 'success';
    }

    return 'failed';
  } catch (error) {
    throw new Error('failed to is verified user');
  }
};
