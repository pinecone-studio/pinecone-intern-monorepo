import mongoose from 'mongoose';
import { ChatMessageModel } from 'src/models/chat-message';
import { MatchModel } from 'src/models/match';
import { Usermodel } from 'src/models/user';
import { QueryResolvers } from 'src/generated';
import { LeanMatch, LeanUser } from 'src/types';

export const getUserAllChatMessages: QueryResolvers['getUserAllChatMessages'] = async (_, { userId }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const matches = await MatchModel.find({
    users: userObjectId,
    unmatched: false,
  }).lean<LeanMatch[]>();

  const allChats = await Promise.all(
    matches.map(async (match) => {
      const participantId = (match.users as mongoose.Types.ObjectId[]).find((id) => !id.equals(userObjectId));

      if (!participantId) return null;

      const participantUser = await Usermodel.findById(participantId).select('name images').lean<LeanUser>();

      if (!participantUser) return null;

      const participant = {
        id: participantUser._id.toString(),
        name: participantUser.name,
        image: participantUser.images?.[0] || null,
      };

      const messages = await ChatMessageModel.find({ matchId: match._id }).sort({ createdAt: 1 }).select('senderId receiverId content createdAt').lean();

      return {
        matchId: match._id.toString(),
        participant,
        messages: messages.map((msg) => ({
          senderId: msg.senderId.toString(),
          receiverId: msg.receiverId.toString(),
          content: msg.content,
          createdAt: msg.createdAt.toISOString(),
        })),
      };
    })
  );

  return allChats.filter((chat): chat is NonNullable<typeof chat> => chat !== null);
};
