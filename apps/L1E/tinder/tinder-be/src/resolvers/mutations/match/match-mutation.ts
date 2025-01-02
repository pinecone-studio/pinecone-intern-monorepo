import { MutationResolvers } from '../../../generated';
import { matchModel } from '../../../models/user/match.model';

export const matchUsersCreate: MutationResolvers['matchUsersCreate'] = async (_: unknown, { input }) => {
  const { userId, targetUserId, stillmatch } = input;

  try {
    const matchedUsers = await matchModel.create({
      userId,
      targetUserId,
      stillmatch,
    });

    return {
      ...matchedUsers.toObject(),
      _id: matchedUsers._id.toString(),
    };
  } catch (error) {
    throw new Error('Already matched or failed to create match');
  }
};
