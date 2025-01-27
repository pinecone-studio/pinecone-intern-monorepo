import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signUp: MutationResolvers['signUp'] = async (_: unknown, { input }) => {
  const { password, email } = input;

  const user = await UserModel.findOne({ email });

  if (user) throw new Error('User already exist');

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = await UserModel.create({ password: hashPassword, email });

  const token = jwt.sign(
    {
      userId: newUser._id,
      email: newUser.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1h',
    }
  );

  return { user: newUser, token };
};
