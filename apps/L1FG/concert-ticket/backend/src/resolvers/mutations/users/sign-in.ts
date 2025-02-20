import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signIn: MutationResolvers['signIn'] = async (_: unknown, { input }) => {
  const { email, password } = input;

  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('Хэрэглэгчийн имэйл олдсонгүй');

  const matchedPassword = bcrypt.compareSync(password, user.password);
  if (!matchedPassword) throw new Error('Нууц үг таарахгүй байна');

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
