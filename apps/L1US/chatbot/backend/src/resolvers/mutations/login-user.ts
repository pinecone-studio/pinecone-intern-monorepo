import { MutationResolvers } from '../../generated';
import { UserModel } from '../../models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginUserInput } from '../../generated';

const getUser = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User does not exist');
  return user;
};

const verifyPassword = async (inputPassword: string, storedPassword: string) => {
  const isMatch = await bcrypt.compare(inputPassword, storedPassword);
  if (!isMatch) throw new Error('Invalid password');
};

const generateToken = (userId: string) => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const loginUser: MutationResolvers['loginUser'] = async (_: unknown, { input }: { input: LoginUserInput }) => {
  const { email, password } = input;

  const foundUser = await getUser(email);
  await verifyPassword(password, foundUser.password);

  return {
    user: foundUser,
    sessionToken: generateToken(foundUser._id),
  };
};
