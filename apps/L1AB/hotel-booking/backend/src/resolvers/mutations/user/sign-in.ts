import jwt from 'jsonwebtoken';
import { userModel } from '../../../models';
import { MutationResolvers } from '../../../generated';

export const signIn: MutationResolvers['signIn'] = async (_, { input }) => {
  const { email, password } = input;

  const user = await userModel.findOne({
    email,
    password,
  });

  if (!user) throw new Error('Invalid credentials');

  const token = jwt.sign(
    {
      user: user,
    },
    process.env.JWT_SECRET!
  );

  return {
    user,
    token,
  };
};
