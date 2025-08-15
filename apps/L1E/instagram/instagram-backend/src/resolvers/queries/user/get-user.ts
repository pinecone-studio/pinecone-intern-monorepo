import { User } from '../../../models/user.model';

interface GetUserArgs {
  _id: string;
}

export const getUser = async (_: unknown, args: GetUserArgs) => {
  const { _id } = args;
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to get user');
  }
};
