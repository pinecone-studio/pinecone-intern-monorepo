import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register: MutationResolvers['register'] = async (_, { input }) => {
  const { email, name, phone, password } = input;

  const user = await UserModel.findOne({ email });

  if (user) throw new Error('Имэйл бүртгэлтэй байна !');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    email,
    name,
    phone,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!);
  return {
    user: newUser,
    token,
  };
};
