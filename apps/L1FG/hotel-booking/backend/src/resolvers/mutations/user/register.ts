import jwt from 'jsonwebtoken';
import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const register: MutationResolvers['register'] = async (_, { input }) => {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('User not found or OTP not verified');

  const newUser = await UserModel.findByIdAndUpdate(user._id, { password: password }, { new: true });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET!
  );

  const Success = true;

  return { success: Success, token: token, user: newUser };
};
