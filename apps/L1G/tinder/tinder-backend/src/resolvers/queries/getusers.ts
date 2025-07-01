import { Usermodel } from 'src/models/user';
import { UserType } from 'src/types';

export const getusers = async (): Promise<UserType[]> => {
  try {
    const users = await Usermodel.find().populate('likedBy', '_id email name').populate('likedTo', '_id email name').lean();

    const transformUser = (user: any): UserType => ({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      likedBy: (user.likedBy || []).map((u: any) => ({
        id: u._id.toString(),
        email: u.email,
        name: u.name,
        likedBy: [],
        likedTo: [],
      })),
      likedTo: (user.likedTo || []).map((u: any) => ({
        id: u._id.toString(),
        email: u.email,
        name: u.name,
        likedBy: [],
        likedTo: [],
      })),
    });

    return users.map(transformUser);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('Unknown error occurred while fetching users');
  }
};
