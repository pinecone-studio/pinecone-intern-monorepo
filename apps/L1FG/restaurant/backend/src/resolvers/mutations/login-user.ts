import { MutationResolvers } from '../../generated';
import { UserModel } from '../../models';
import jwt from 'jsonwebtoken';

export const loginUser: MutationResolvers['loginUser'] = async (_, { input }) => {
  const { email, password } = input;

  const user = await UserModel.findOne({
    email,
    password,
  });

  if (!user) throw new Error('Invalid credentials');

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET!
  );

  return {
    user,
    token,
  };
};
