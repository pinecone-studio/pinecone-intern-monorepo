import mongoose from 'mongoose';
import { Usermodel } from 'src/models/user';
interface IUserLean {
  _id: string | mongoose.Types.ObjectId;
  email: string;
  name: string;
  likedBy?: IUserLean[];
  likedTo?: IUserLean[];
}
export const getusers = async () => {
  try {
    const users = await Usermodel.find().populate('likedBy').populate('likedTo').lean<IUserLean[]>();

    return users.map((user) => ({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      likedBy: (user.likedBy || []).map((likedUser) => ({
        id: likedUser._id.toString(),
        email: likedUser.email,
        name: likedUser.name,
        likedBy: [],
        likedTo: [],
      })),
      likedTo: (user.likedTo || []).map((likedUser) => ({
        id: likedUser._id.toString(),
        email: likedUser.email,
        name: likedUser.name,
        likedBy: [],
        likedTo: [],
      })),
    }));
  } catch (error) {
    console.warn('⚠️ Failed to fetch users:', (error as Error).message);
    throw new Error((error as Error).message);
  }
};
