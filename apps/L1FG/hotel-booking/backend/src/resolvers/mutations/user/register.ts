import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcryptjs';

export const register: MutationResolvers['register'] = async (_, { input }) => {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('User not found or OTP not verified');
  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });

  return { success: true };
};
