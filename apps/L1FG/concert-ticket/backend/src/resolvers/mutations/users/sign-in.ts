import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signIn: MutationResolvers['signIn'] = async (_: unknown, { input }) => {
  const { email, password } = input;

  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('User email not found');

  const matchedPassword = bcrypt.compareSync(password, user.password);
  if (!matchedPassword) throw new Error('password not match');

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1h',
    }
  );

  return { user, token };
};
