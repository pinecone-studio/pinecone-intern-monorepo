import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signInUser: MutationResolvers['signInUser'] = async (_, { input }) => {
  const { email, password } = input;

  const user = await userModel.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Username or Password incorrect');

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
