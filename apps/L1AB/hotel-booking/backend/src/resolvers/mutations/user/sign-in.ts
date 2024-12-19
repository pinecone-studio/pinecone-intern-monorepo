import jwt from 'jsonwebtoken';
import { userModel } from '../../../models';
import { MutationResolvers } from '../../../generated';
import bcrypt from 'bcrypt';

export const signIn: MutationResolvers['signIn'] = async (_, { input }) => {
  const { email, password } = input;

  const user = await userModel.findOne({
    email,
  });

  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Password or email is incorrect');

  const token = jwt.sign(
    {
      user: user._id,
    },
    process.env.JWT_SECRET!
  );

  return {
    user,
    token,
  };
};
