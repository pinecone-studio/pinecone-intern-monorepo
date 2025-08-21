import { User } from '../../../models/user.model';

interface GetProfileArgs {
  userName: string;
}

export const getProfiles = async (_: unknown, args: GetProfileArgs) => {
  const { userName } = args;
  try {
    const user = await User.find({ userName: new RegExp(userName, 'i') });
    if (!user) {
      throw new Error('Profile not found');
    }
    return user;
  } catch (error) {
    console.error('Get profiles error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to get profiles');
  }
};
