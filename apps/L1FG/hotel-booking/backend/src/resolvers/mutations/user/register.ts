import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import jwt from 'jsonwebtoken';

export const register: MutationResolvers['register'] = async (_, { input }) => {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });

  if (user) throw new Error('User already exists');

  const newUser = await UserModel.create({
    email,
    password,
  });

  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    process.env.JWT_SECRET!
  );

  return {
    user: newUser,
    token,
  };
};
