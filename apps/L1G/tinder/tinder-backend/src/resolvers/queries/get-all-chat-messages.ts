import mongoose from 'mongoose';
import { ChatMessageModel } from 'src/models/chat-message';
import { MatchModel } from 'src/models/match';
import { Usermodel } from 'src/models/user';
import { QueryResolvers } from 'src/generated';
import { IMatchLean, LeanChatMessage, LeanUser } from 'src/types';

export const getUserAllChatMessages: QueryResolvers['getUserAllChatMessages'] = async (_, { userId }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const matches = await MatchModel.find({
    users: userObjectId,
    unmatched: false,
  }).lean<IMatchLean[]>();

  const allChats = await Promise.all(
    matches.map(async (match) => {
      const participantId = (match.users as any).find((id: any) => !id.equals(userObjectId));

      if (!participantId) return null;

      const participantUser = await Usermodel.findById(participantId).select('name images').lean<LeanUser>();

      if (!participantUser) return null;

      const participant = {
        id: participantUser._id.toString(),
        name: participantUser.name,
        image: participantUser.images?.[0] ?? undefined,
      };

      const messages = await ChatMessageModel.find({ matchId: match._id }).sort({ createdAt: 1 }).select('_id senderId receiverId content createdAt seen').lean<LeanChatMessage[]>();
      return {
        matchId: match._id.toString(),
        participant,
        messages: messages.map((msg) => ({
          id: msg._id.toString(),
          senderId: msg.senderId.toString(),
          receiverId: msg.receiverId.toString(),
          content: msg.content,
          createdAt: new Date(msg.createdAt).toISOString(),
          seen: msg.seen ?? false,
        })),
      };
    })
  );

  return allChats.filter((chat): chat is NonNullable<typeof chat> => chat !== null);
};
