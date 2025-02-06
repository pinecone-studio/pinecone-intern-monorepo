import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcryptjs';

export const updatePassword: MutationResolvers['updatePassword'] = async (_: unknown, { input }) => {
  const { email, newPassword } = input;

  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('Email not found');

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  const updatePassword = await UserModel.findOneAndUpdate({ email }, { password: hashedPassword });
  return updatePassword;
};
