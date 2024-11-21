import { MutationResolvers } from '../../../generated';
import bcrypt from 'bcrypt';
import { userModel } from '../../../models';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signUp: MutationResolvers['signUp'] = async (_: unknown, { input }) => {
  try {
    if (!emailRegex.test(input.email)) {
      return {
        success: false,
        message: 'Invalid email format',
      };
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await userModel.create({
      email: input.email,
      password: hashedPassword,
    });

    return {
      user: user,
      success: true,
      message: `User ${user.email} created successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create user',
    };
  }
};
