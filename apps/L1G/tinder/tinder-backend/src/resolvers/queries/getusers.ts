import mongoose from 'mongoose';
import { Usermodel } from 'src/models/user';

interface IUserLean {
  _id: string | mongoose.Types.ObjectId;
  email: string;
  name: string;
  images?: string[] | null;
  likedBy?: IUserLean[] | null;
  likedTo?: IUserLean[] | null;
  matched?: IUserLean[] | null;
}

export const mapSimpleUser = (user: IUserLean) => ({
  id: user._id.toString(),
  email: user.email,
  name: user.name,
  likedBy: [],
  likedTo: [],
  matched: [],
});

export const mapMatchedUsers = (matched: IUserLean[] | null = []) => (Array.isArray(matched) ? matched.map(mapSimpleUser) : []);

export const mapLikedByUsers = (likedBy: IUserLean[] | null = []) => (Array.isArray(likedBy) ? likedBy.map(mapSimpleUser) : []);

export const mapLikedToUsers = (likedTo: IUserLean[] | null = []) => (Array.isArray(likedTo) ? likedTo.map(mapSimpleUser) : []);

const transformUser = (user: IUserLean) => ({
  id: user._id.toString(),
  email: user.email,
  name: user.name,
  images: user.images ?? [],
  matched: mapMatchedUsers(user.matched),
  likedBy: mapLikedByUsers(user.likedBy),
  likedTo: mapLikedToUsers(user.likedTo),
});

export const getusers = async () => {
  try {
    const users = await Usermodel.find().populate('likedBy').populate('likedTo').populate('matched').lean<IUserLean[]>();

    return users.map(transformUser);
  } catch (error) {
    console.warn('⚠️ Failed to fetch users:', (error as Error).message);
    throw new Error((error as Error).message);
  }
};
