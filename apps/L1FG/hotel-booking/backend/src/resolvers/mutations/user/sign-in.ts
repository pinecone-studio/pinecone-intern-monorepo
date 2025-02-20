import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signIn: MutationResolvers['signIn'] = async (_, { input }) => {
  const { email, password } = input;
  console.log(input);
  const user = await UserModel.findOne({ email: email });
  const sessionSecret = process.env.JWT_SECRET;
  if (!sessionSecret) {
    throw new Error('Secret is not here bro');
  }
  if (!user) {
    throw new Error('User Not Found');
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new Error('Password is wrong');
  }
  const token = jwt.sign({ userId: user._id }, sessionSecret, {
    expiresIn: '12h',
  });
  return {
    user,
    token,
  };
};
