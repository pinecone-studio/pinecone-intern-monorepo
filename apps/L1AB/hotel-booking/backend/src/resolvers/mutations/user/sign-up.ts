import { MutationResolvers } from '../../../generated';
import bcrypt from 'bcrypt';
import { userModel } from '../../../models';

export const signUp: MutationResolvers['signUp'] = async (_: unknown, { input }) => {
  const { email, password } = input;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email: email,
    password: hashedPassword,
  });

  return {
    user: user,
    success: true,
    message: `User ${user.email} created successfully`,
  };
};
