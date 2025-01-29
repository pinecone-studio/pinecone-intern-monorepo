import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcryptjs';

export const signUp: MutationResolvers['signUp'] = async (_: unknown, { input }) => {
  const { password, email } = input;

  const user = await UserModel.findOne({ email });

  if (user) throw new Error('User already exist');

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = await UserModel.create({ password: hashPassword, email });

  return newUser;
};
