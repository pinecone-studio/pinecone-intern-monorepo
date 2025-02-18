import { MutationResolvers } from './../../../generated/index';
import { UserModel } from '../../../models';

export const forgetPassword: MutationResolvers['forgetPassword'] = async (_, { input }) => {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('User not found or OTP not verified');

  await UserModel.findByIdAndUpdate(user._id, { password: password });

  return { success: true };
};
