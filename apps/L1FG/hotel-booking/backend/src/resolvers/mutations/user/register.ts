import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const register: MutationResolvers['register'] = async (_, { input }) => {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('User not found or OTP not verified');

  await UserModel.findByIdAndUpdate(user._id, { password: password }, { new: true });

  return { success: true };
};
