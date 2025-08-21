import { User } from '../../../models/user.model';

interface GetUserArgs {
  userName: string;
}

export const getSomeoneProfile = async (_: unknown, args: GetUserArgs) => {
  const { userName } = args;
  try {
    const user = await User.findOne({ userName: userName });
    if (!user) {
      throw new Error('Profile not found');
    }
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to get profile');
  }
};
