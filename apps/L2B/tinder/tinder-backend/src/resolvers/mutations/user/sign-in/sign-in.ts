import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../../../../models';

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

export const signIn = async (_: unknown, args: { email: string; password: string }) => {
  const { email, password } = args;

  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error('email is not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('password is incorrect');
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

  return token;
};
