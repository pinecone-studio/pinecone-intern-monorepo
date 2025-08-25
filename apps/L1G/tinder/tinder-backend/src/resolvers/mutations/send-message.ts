import { ChatMessageModel } from 'src/models/chat-message';
import { MutationResolvers } from 'src/generated';
import mongoose from 'mongoose';

export const sendMessage: MutationResolvers['sendMessage'] = async (_, { senderId, receiverId, matchId, content }) => {
  const senderObjectId = new mongoose.Types.ObjectId(senderId);
  const receiverObjectId = new mongoose.Types.ObjectId(receiverId);
  const matchObjectId = new mongoose.Types.ObjectId(matchId);

  const match = await mongoose.model('Match').findOne({
    _id: matchObjectId,
    users: { $all: [senderObjectId, receiverObjectId] },
    unmatched: false,
  });

  if (!match) {
    throw new Error('No valid match found between users');
  }

  const newMessage = await ChatMessageModel.create({
    matchId: matchObjectId,
    senderId: senderObjectId,
    receiverId: receiverObjectId,
    content,
    seen: false,
    notified: false,
  });

  console.log(`📨 Notify user ${receiverId} of new message from ${senderId}`);

  return {
    id: newMessage._id.toString(),
    senderId: newMessage.senderId.toString(),
    receiverId: newMessage.receiverId.toString(),
    content: newMessage.content,
    createdAt: newMessage.createdAt.toISOString(),
    seen: newMessage.seen,
  };
};
