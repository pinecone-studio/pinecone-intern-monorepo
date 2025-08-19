import { User } from '../../../models/user.model';

interface GetUserArgs {
  userName: string;
}

export const getProfiles = async (_: unknown, args: GetUserArgs) => {
  const { userName } = args;
  try {
    const user = await User.find({ userName: new RegExp(userName, 'i') });
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
