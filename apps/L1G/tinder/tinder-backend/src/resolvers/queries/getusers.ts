import mongoose from 'mongoose';
import { Usermodel } from 'src/models/user';

interface IInterestLean {
  _id: string | mongoose.Types.ObjectId;
  interestName: string;
}
export interface IUserLean {
  _id: string | mongoose.Types.ObjectId;
  email: string;
  name: string;
  gender?: string | null;
  genderPreferences?: string | null;
  dateOfBirth?: string | null;
  bio?: string | null;
  interests?: IInterestLean[] | null;
  profession?: string | null;
  schoolWork?: string | null;
  images?: string[] | null;
  likedBy?: IUserLean[] | null;
  likedTo?: IUserLean[] | null;
  matchIds?: IUserLean[] | null;
}

export const mapSimpleUser = (user: IUserLean) => ({
  id: user._id!.toString(),
  email: user.email,
  name: user.name,
  dateOfBirth: user.dateOfBirth,
  genderPreferences: user.genderPreferences,
  gender: user.gender,
  bio: user.bio,
  interests: user.interests && user.interests.length > 0 
    ? user.interests
        .filter((interest): interest is IInterestLean => !!interest && !!interest._id)
        .map((interest) => ({
          _id: interest._id!.toString(),
          interestName: interest.interestName,
        }))
    : undefined,
  profession: user.profession,
  schoolWork: user.schoolWork,
  images: user.images ?? [],
  likedBy: [],
  likedTo: [],
  matchIds: [],
});

export const mapMatchedUsers = (matched: IUserLean[] | null = []) => (Array.isArray(matched) ? matched.map(mapSimpleUser) : []);

export const mapLikedByUsers = (likedBy: IUserLean[] | null = []) => (Array.isArray(likedBy) ? likedBy.map(mapSimpleUser) : []);

export const mapLikedToUsers = (likedTo: IUserLean[] | null = []) => (Array.isArray(likedTo) ? likedTo.map(mapSimpleUser) : []);
/* eslint-disable-next-line complexity */
const transformUser = (user: IUserLean) => ({
  id: user._id ? user._id.toString() : '',
  email: user.email,
  name: user.name,
  dateOfBirth: user.dateOfBirth,
  genderPreferences: user.genderPreferences,
  gender: user.gender,
  bio: user.bio,
  interests: user.interests && user.interests.length > 0
    ? user.interests.map((interest) => ({
        _id: interest._id ? interest._id.toString() : '',
        interestName: interest.interestName,
      }))
    : undefined,
  profession: user.profession,
  schoolWork: user.schoolWork,
  images: user.images ?? [],
  matchIds: mapMatchedUsers(user.matchIds),
  likedBy: mapLikedByUsers(user.likedBy),
  likedTo: mapLikedToUsers(user.likedTo),
});


export const getusers = async () => {
  try {
    const users = await Usermodel.find().populate('likedBy').populate('likedTo').populate('matchIds').populate('interests').lean<IUserLean[]>();

    return users.map(transformUser);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error while fetching users';

    if (process.env.NODE_ENV !== 'production') {
      console.error('⚠️ Failed to fetch users:', error);
    }

    throw new Error(message);
  }
};