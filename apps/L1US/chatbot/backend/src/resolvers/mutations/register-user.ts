import { MutationResolvers, RegisterUserInput } from '../../generated';
import { UserModel } from '../../models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser: MutationResolvers['registerUser'] = async (_: unknown, { input }: { input: RegisterUserInput }) => {
  const { email, password, username } = input;
  const foundUser = await UserModel.findOne({
    email,
  });
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  if (foundUser) {
    throw new Error('User exsists with this email');
  }
  const userNameFound = await UserModel.findOne({
    username,
  });
  if (userNameFound) {
    throw new Error('User name is taken');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  return { user, sessionToken: token };
};
