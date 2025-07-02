import { userModel } from '../../../../models';
import bcrypt from 'bcrypt';

export const forgotPassword = async (_: unknown, { email, password }: { email: string; password: string }) => {
  const incPassword = await bcrypt.hash(password, 10);
  const updatedUser = await userModel.findOneAndUpdate({ email }, { $set: { password: incPassword } }, { new: true });
  if (!updatedUser) {
    throw new Error('user not found');
  }

  return updatedUser;
};
