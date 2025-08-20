import mongoose from 'mongoose';
import { Usermodel } from 'src/models/user';

interface IUserLean {
  _id: string | mongoose.Types.ObjectId;
  email: string;
  name: string;
  images?: string[] | null;
  likedBy?: IUserLean[] | null;
  likedTo?: IUserLean[] | null;
  matchIds?: IUserLean[] | null;
}

export const mapSimpleUser = (user: IUserLean) => ({
  id: user._id.toString(),
  email: user.email,
  name: user.name,
  likedBy: [],
  likedTo: [],
  matchIds: [],
});

export const mapMatchedUsers = (matched: IUserLean[] | null = []) =>
  Array.isArray(matched) ? matched.map(mapSimpleUser) : [];

export const mapLikedByUsers = (likedBy: IUserLean[] | null = []) =>
  Array.isArray(likedBy) ? likedBy.map(mapSimpleUser) : [];

export const mapLikedToUsers = (likedTo: IUserLean[] | null = []) =>
  Array.isArray(likedTo) ? likedTo.map(mapSimpleUser) : [];

const transformUser = (user: IUserLean) => ({
  id: user._id.toString(),
  email: user.email,
  name: user.name,
  images: user.images ?? [],
  matchIds: mapMatchedUsers(user.matchIds),
  likedBy: mapLikedByUsers(user.likedBy),
  likedTo: mapLikedToUsers(user.likedTo),
});

export const getusers = async () => {
  try {
    const users = await Usermodel.find()
      .populate('likedBy')
      .populate('likedTo')
      .populate('matchIds')
      .lean<IUserLean[]>();

    return users.map(transformUser);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown error while fetching users';

    if (process.env.NODE_ENV !== 'production') {
      console.error('⚠️ Failed to fetch users:', error);
    }

    throw new Error(message);
  }
};
