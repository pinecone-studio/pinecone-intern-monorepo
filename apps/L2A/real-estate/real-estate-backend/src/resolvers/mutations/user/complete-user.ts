import bcrypt from 'bcryptjs';
import { USER_MODEL } from '../../../models/user';
import { generateToken } from '../../../utils/jwt';

export const completeSignup = async (_: any, args: { email: string; password: string }) => {
  const { email, password } = args;

  const existingUser = await USER_MODEL.findOne({ email });
  if (!existingUser) throw new Error('User not found');
  if (existingUser.password) throw new Error('Password already set — try logging in');

  const hashedPassword = bcrypt.hashSync(password, 10);

  const updatedUser = await USER_MODEL.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true }
  );

  if (!updatedUser) throw new Error('User update failed');

  const token = generateToken({
    id: updatedUser._id.toString(),
    email: updatedUser.email,
  });

  return {
    user: {
      id: updatedUser._id.toString(),
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    },
    token,
  };
};
