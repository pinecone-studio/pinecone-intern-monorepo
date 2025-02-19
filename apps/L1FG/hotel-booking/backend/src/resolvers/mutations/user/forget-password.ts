import { MutationResolvers } from './../../../generated/index';
import { UserModel } from '../../../models';
import bcrypt from "bcrypt";

export const forgetPassword: MutationResolvers['forgetPassword'] = async (_, { input }) => {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('User not found or OTP not verified');

  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

  return { success: true };
};
