import { QueryResolvers, Conversation, User } from '../../../generated';
import ConversationModel from '../../../models/chat/conversation.model';
import { MessageModel } from '../../../models/chat/message.model';
import { Types } from 'mongoose';
import { userModel } from '../../../models/user/user.model';

export const getConversation: QueryResolvers['getConversation'] = async (_, { userOne, userTwo }): Promise<Conversation> => {
  const userOneData = await userModel.findById(userOne);
  const userTwoData = await userModel.findById(userTwo);

  if (!userOneData || !userTwoData) {
    throw new Error('One or both users not found');
  }

  const userOneTyped: User = {
    ...userOneData.toObject(),
  };

  const userTwoTyped: User = {
    ...userTwoData.toObject(),
  };

  const conversation = await ConversationModel.findOne({
    $or: [
      { userOne: new Types.ObjectId(userOne), userTwo: new Types.ObjectId(userTwo) },
      { userOne: new Types.ObjectId(userTwo), userTwo: new Types.ObjectId(userOne) },
    ],
  });

  const messages = await MessageModel.find({ conversationId: conversation._id });
  const formattedMessages = messages.map((message) => ({
    id: message._id.toString(),
    text: message.content,
    sender: message.senderId.toString(),
    timeStamp: message.timeStamp,
    images: message.images,
  }));

  return {
    id: conversation._id.toString(),
    userOne: userOneTyped,
    userTwo: userTwoTyped,
    messages: formattedMessages,
  };
};
