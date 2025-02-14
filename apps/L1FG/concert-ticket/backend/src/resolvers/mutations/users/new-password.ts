import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcryptjs';
export const newPassword: MutationResolvers['newPassword'] = async (_: unknown, { input }) => {
  const { oldPassword, newPassword, userId } = input;

  const user = await UserModel.findById({ _id: userId });

  if (!user) throw new Error('User not found');

  const matched = bcrypt.compareSync(oldPassword, user.password);

  if (!matched) throw new Error('Хуучин нууц үг буруу байна');

  const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

  const orderNewPassword = await UserModel.findByIdAndUpdate({ _id: userId }, { password: hashedNewPassword });

  return orderNewPassword;
};
