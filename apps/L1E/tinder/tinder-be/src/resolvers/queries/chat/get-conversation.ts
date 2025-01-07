import { QueryResolvers, Conversation } from '../../../generated';
import ConversationModel from '../../../models/chat/conversation.model';
import { MessageModel } from '../../../models/chat/message.model';

export const getConversation: QueryResolvers['getConversation'] = async (_, { userOne, userTwo }): Promise<Conversation> => {
  const conversation = await ConversationModel.findOne({
    $and: [{ userOne }, { userTwo }],
  });

  if (!conversation) {
    throw new Error('Conversation not found');
  }

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
