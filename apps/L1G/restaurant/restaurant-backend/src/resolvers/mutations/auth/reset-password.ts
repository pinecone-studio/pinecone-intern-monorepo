import { MutationResolvers } from 'src/generated';
import { UserModel } from 'src/models/user.model';
import bcrypt from 'bcryptjs';

export const resetPassword: MutationResolvers['resetPassword'] = async (_, { input: { email, newPassword } }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetCode = undefined;
  user.resetCodeExpiresAt = undefined;
  await user.save();

  return {
    success: true,
    message: 'Password reset successfully',
  };
};
