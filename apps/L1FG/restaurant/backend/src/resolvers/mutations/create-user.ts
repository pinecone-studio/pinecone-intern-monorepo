import { MutationResolvers } from '../../generated';
import { UserModel } from '../../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const createUser: MutationResolvers['createUser'] = async (_, { input }) => {
  const { email, password } = input;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    ...input,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string);

  return {
    user: newUser,
    token,
  };
};
