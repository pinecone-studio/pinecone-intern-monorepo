import { matchModel } from '../../../models/user/match.model';

export const unMatch = async (_: unknown, { authId }: { authId: string }) => {
  const match = await matchModel.findOneAndDelete({ targetUserId: authId });

  if (!match) {
    return [];
  }

  if (!match._id) {
    throw new Error('Match object does not include required _id field.');
  }

  return [match];
};
