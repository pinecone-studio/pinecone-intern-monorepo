import { QueryResolvers, Conversation } from '../../../generated';
import ConversationModel from '../../../models/chat/conversation.model';
import { MessageModel } from '../../../models/chat/message.model';
import { Types } from 'mongoose';

export const getConversation: QueryResolvers['getConversation'] = async (_, { userOne, userTwo }): Promise<Conversation> => {
  const conversation = await ConversationModel.findOne({
    $and: [{ userOne: new Types.ObjectId(userOne) }, { userTwo: new Types.ObjectId(userTwo) }],
  });

  const messages = await MessageModel.find({ conversationId: conversation._id });

  const formattedMessages = messages.map((message) => ({
    id: message._id.toString(),
    text: message.content,
    sender: message.senderId.toString(), // Convert ObjectId to string
  }));

  return {
    id: conversation._id.toString(),
    userOne,
    userTwo,
    messages: formattedMessages,
  };
};
