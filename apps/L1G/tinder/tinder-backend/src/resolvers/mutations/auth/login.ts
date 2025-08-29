import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usermodel } from 'src/models/user';
import { LoginArgs } from 'src/types';

const validateUser = async (email: string, password: string) => {
  const user = await Usermodel.findOne({ email });
  if (!user || !user.password) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return user;
};

const generateToken = (userId: string, email: string, secret: string) => {
  return jwt.sign({ userId, email }, secret, { expiresIn: '7d' });
};

export const login = async (_: unknown, args: LoginArgs): Promise<string> => {
  const { email, password } = args;

  const user = await validateUser(email, password);

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return generateToken(user._id.toString(), user.email, JWT_SECRET);
};
