import mongoose from 'mongoose';
import { MatchModel } from 'src/models/match';
import { ChatMessageModel } from 'src/models/chat-message';
import { Usermodel } from 'src/models/user';
import { QueryResolvers } from 'src/generated';
import { LeanChatMessage, LeanMatch, LeanUser } from 'src/types';

export const getChatWithUser: QueryResolvers['getChatWithUser'] = async (_, { userId, participantId }) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const participantObjectId = new mongoose.Types.ObjectId(participantId);

  const match = await MatchModel.findOne({
    users: { $all: [userObjectId, participantObjectId] },
    unmatched: false,
  }).lean<LeanMatch>();

  if (!match) {
    throw new Error('No match found');
  }

  const participantUser = await Usermodel.findById(participantObjectId).select('name images').lean<LeanUser>();

  if (!participantUser) {
    throw new Error('Participant user not found');
  }

  const participant = {
    id: participantUser._id.toString(),
    name: participantUser.name,
    image: participantUser.images?.[0] ?? undefined,
  };

  const messages = await ChatMessageModel.find({ matchId: match._id }).sort({ createdAt: 1 }).select('senderId receiverId content createdAt seen').lean<LeanChatMessage[]>();

  return {
    matchId: match._id.toString(),
    participant,
    messages: messages.map((msg) => ({
      id: msg._id.toString(),
      senderId: msg.senderId.toString(),
      receiverId: msg.receiverId.toString(),
      content: msg.content,
      createdAt: msg.createdAt.toISOString(),
      seen: msg.seen ?? false,
    })),
  };
};
