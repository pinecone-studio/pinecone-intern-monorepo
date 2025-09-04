/* eslint-disable complexity*/
import { QueryResolvers } from 'src/generated';
import { MatchModel } from 'src/models/match';
import { Types } from 'mongoose';
import { Usermodel } from 'src/models/user';
import { dislike } from '../mutations';

// getUsers.ts-ээс helper function-уудыг импорт хийх, эсвэл энд дахин тодорхойлох
const transformUser = (user: any, currentUserId?: string) => ({
  id: user._id ? user._id.toString() : '',
  email: user.email,
  name: user.name,
  dateOfBirth: user.dateOfBirth,
  genderPreferences: user.genderPreferences,
  gender: user.gender,
  bio: user.bio,
  interests: user.interests && user.interests.length > 0
    ? user.interests
        .filter((interest: any) => !!interest && !!interest._id)
        .map((interest: any) => ({
          _id: interest._id.toString(),
          interestName: interest.interestName,
        }))
        
    : [],
  profession: user.profession,
  schoolWork: user.schoolWork,
  images: user.images ?? [],
  // Жинхэнэ өгөгдлийг populate хийж авах
  likedBy: user.likedBy ? user.likedBy.map((u: any) => ({ id: u._id.toString() })) : [],
  likedTo: user.likedTo ? user.likedTo.map((u: any) => ({ id: u._id.toString() })) : [],
  dislikedTo: user.dislikedTo ? user.dislikedTo.map((u: any) => ({ id: u._id.toString() })) : [],
  matchIds: user.matchIds ? user.matchIds.map((match: any) => {
    // Match дотрх хэрэглэгчийн мэдээлэл авах
    const matchedUser = Array.isArray(match.users) 
      ? match.users.find((u: any) => u._id.toString() !== currentUserId) 
      : null;
    
    return {
      id: match._id.toString(),
      matchedAt: match.matchedAt,
      unmatched: match.unmatched || false,
      startedConversation: match.startedConversation || false,
      // Хэрэв илүү дэлгэрэнгүй мэдээлэл хэрэгтэй бол
      matchedUser: matchedUser ? {
        id: matchedUser._id.toString(),
        name: matchedUser.name,
        images: matchedUser.images ?? []
      } : null
    };
  }) : []
});

export const getOtherUsers: QueryResolvers['getOtherUsers'] = async (_, { _id }) => {
  const currentUser = await Usermodel.findById(_id).populate('likedBy').populate('likedTo').lean();

  if (!currentUser) throw new Error('User not found');

  const currentUserObj: any = currentUser;

  const likedOrLikedByIds = new Set([
    ...currentUserObj.likedBy.map((u: any) => u._id.toString()), 
    ...currentUserObj.likedTo.map((u: any) => u._id.toString()), 
    _id
  ]);

  const matches = await MatchModel.find({ users: _id, unmatched: false }).lean();
  const matchedUserIds = new Set(
    matches.flatMap((m) => 
      (m.users as Types.ObjectId[])
        .map((uid: Types.ObjectId) => uid.toString())
    ).filter((uid: string) => uid !== _id)
  );

  const excludedIds = new Set([...likedOrLikedByIds, ...matchedUserIds]);

  // getUsers.ts-ийн нэгэн адил populate хийх
  const otherUsers = await Usermodel.find({ _id: { $nin: Array.from(excludedIds) } })
    .populate('likedBy')
    .populate('likedTo')
    .populate('dislikedTo')
    .populate({
      path: 'matchIds',
      populate: {
        path: 'users',
        model: 'User',
        select: 'name email _id images profession dateOfBirth gender genderPreferences bio interests schoolWork',
      },
    })
    .populate('interests')
    .lean();

  // getUsers.ts-ийн transformUser function ашиглах
  return otherUsers.map(user => transformUser(user, _id));
};