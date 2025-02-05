import { MutationResolvers } from '../../generated';
import { UserModel } from '../../models';
import jwt from 'jsonwebtoken';

export const createUser: MutationResolvers['createUser'] = async (_, { input }) => {
  const { email } = input;

  const user = await UserModel.findOne({ email });

  if (user) throw new Error('User already exists');

  const newUser = await UserModel.create({
    ...input,
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
