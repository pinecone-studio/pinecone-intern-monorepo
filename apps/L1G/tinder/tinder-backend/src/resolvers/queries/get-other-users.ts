import { QueryResolvers } from 'src/generated';
import { MatchModel } from 'src/models/match';
import { Types } from 'mongoose';
import { Usermodel } from 'src/models/user';

export const getOtherUsers: QueryResolvers['getOtherUsers'] = async (_, { _id }) => {
  const currentUser = await Usermodel.findById(_id).populate('likedBy').populate('likedTo').lean();

  if (!currentUser) throw new Error('User not found');

  const currentUserObj: any = currentUser;

  const likedOrLikedByIds = new Set([...currentUserObj.likedBy.map((u: any) => u._id.toString()), ...currentUserObj.likedTo.map((u: any) => u._id.toString()), _id]);

  const matches = await MatchModel.find({ users: _id, unmatched: false }).lean();
  const matchedUserIds = new Set(matches.flatMap((m) => (m.users as Types.ObjectId[]).map((uid: Types.ObjectId) => uid.toString())).filter((uid: string) => uid !== _id));

  const excludedIds = new Set([...likedOrLikedByIds, ...matchedUserIds]);

  const otherUsers = await Usermodel.find({ _id: { $nin: Array.from(excludedIds) } })
    .select('name email images profession dateOfBirth bio gender genderPreferences interests schoolWork')
    .lean();

  const usersFormatted = otherUsers.map((u: any) => ({
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
      u.interests?.map((i: any) => ({
        _id: i._id.toString(),
        interestName: i.interestName,
      })) ?? [],
    schoolWork: u.schoolWork,
  }));

  return usersFormatted;
};
