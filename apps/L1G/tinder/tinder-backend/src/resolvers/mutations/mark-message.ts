import { ChatMessageModel } from 'src/models/chat-message';

export const markMessagesAsSeen = async (_: any, { matchId, userId }: { matchId: string; userId: string }) => {
  await ChatMessageModel.updateMany(
    {
      matchId,
      receiverId: userId,
      seen: false,
    },
    { $set: { seen: true } }
  );

  return true;
};
