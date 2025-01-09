import { matchModel } from '../../../models/user/match.model';

export const matchUsersCreate = async (_: unknown, { input }: any) => {
  const { userId, targetUserId, stillmatch } = input;

  const matchedUsers = await matchModel.create({ userId, targetUserId, stillmatch });
  const populatedMatch = await matchedUsers.populate('userId targetUserId');

  const matchObject = populatedMatch.toObject ? populatedMatch.toObject() : populatedMatch;

  return {
    ...matchObject,
    _id: matchObject._id.toString(),
  };
};
