import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../../../models/user/user.model';

export const login = async (_: unknown, { email, password }: any) => {
  const user = await userModel.findOne({ email });

  if (!user) throw new Error('бүртгэлгүй байна!');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Email or Password incorrect');

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.SECRET!
  );

  return {
    user,
    token,
  };
};
