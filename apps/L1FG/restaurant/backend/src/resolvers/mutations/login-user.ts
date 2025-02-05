import { MutationResolvers } from '../../generated';
import { UserModel } from '../../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const loginUser: MutationResolvers['loginUser'] = async (_, { input }) => {
  const { email, password } = input;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string);

  return {
    user,
    token,
  };
};
