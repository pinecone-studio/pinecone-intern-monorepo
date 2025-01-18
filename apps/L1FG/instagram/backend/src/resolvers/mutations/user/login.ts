import { MutationResolvers, User } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { tokenExpireCal } from '../../../utils/token-expire-cal';
export const login: MutationResolvers['login'] = async (_, { input }) => {
  const { email, password } = input;
  const user: User | null = await UserModel.findOne({ email });
  if (!user) throw new Error('Бүртгэлгүй байна');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password is incorrect');
  }
  const exp = tokenExpireCal('minute', 30);
  if (!process.env.SESSION_SECRET) {
    throw new Error('Session secret is not defined');
  }
  const token = jwt.sign(
    {
      userId: user._id,
      exp: exp,
    },
    process.env.SESSION_SECRET
  );
  return {
    token,
    exp,
    user,
  };
};
