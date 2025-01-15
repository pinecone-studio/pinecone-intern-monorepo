import ConversationModel from '../../../models/chat/conversation.model';
import { matchModel } from '../../../models/user/match.model';

export const unMatch = async (_: unknown, { authId }: { authId: string }) => {
  const match = await matchModel.findOneAndDelete({
    $or: [{ targetUserId: authId }, { userId: authId }],
  });

  if (!match || !match._id) {
    throw new Error('Invalid match object, missing _id');
  }

  await ConversationModel.findOneAndDelete({
    userOne: authId,
  });

  return [match];
};
