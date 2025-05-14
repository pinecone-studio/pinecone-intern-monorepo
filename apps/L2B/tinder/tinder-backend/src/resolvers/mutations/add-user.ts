import { userModel } from '../../models';
import bcrypt from 'bcrypt';
export const addUser = async (_: unknown, { email, password }: { email: string; password: string }) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('user not found');
    }
    const incPassword = await bcrypt.hash(password, 10);
    const updatedUser = await userModel.findByIdAndUpdate(user._id, { password: incPassword });
    return updatedUser;
  } catch (error) {
    throw new Error('failed to add user');
  }
};
