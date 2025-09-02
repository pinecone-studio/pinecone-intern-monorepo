import { QueryResolvers } from 'src/generated';
import { Usermodel } from 'src/models/user';
import { MatchModel } from 'src/models/match';
import { Types } from 'mongoose';

interface IInterest {
  _id: Types.ObjectId;
  interestName: string;
}

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  images?: string[];
  profession?: string;
  dateOfBirth?: string;
  bio?: string;
  gender?: string;
  genderPreferences?: string;
  interests?: IInterest[];
  schoolWork?: string;
}

export const getLikedByUsers: QueryResolvers['getLikedByUsers'] = async (_, { _id }) => {
  const user = await Usermodel.findById(_id)
    .populate({
      path: 'likedBy',
      select: 'name email images profession dateOfBirth bio gender genderPreferences interests schoolWork',
    })
    .lean();

  if (!user) throw new Error('User not found');

  const userObj: any = user;

  const matches = await MatchModel.find({
    users: _id,
    unmatched: false,
  }).lean();

  const matchedUserIds = new Set(
    matches
      .flatMap((m) =>
        (m.users as Types.ObjectId[]).map((uid: Types.ObjectId) => uid.toString())
      )
      .filter((uid: string) => uid !== _id)
  );

  const likedByUsers = (userObj.likedBy as IUser[])
    .filter((u: IUser) => !matchedUserIds.has(u._id.toString()))
    .map((u: IUser) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      images: u.images ?? [],
      profession: u.profession,
      dateOfBirth: u.dateOfBirth,
      bio: u.bio,
      gender: u.gender,
      genderPreferences: u.genderPreferences,
      interests:
        u.interests?.length
          ? u.interests.map((i: IInterest) => ({
              _id: i._id.toString(),
              interestName: i.interestName,
            }))
          : [],
      schoolWork: u.schoolWork,
    }));

  return {
    id: userObj._id.toString(),
    email: userObj.email ?? '',
    likedBy: likedByUsers,
  };
};
