import { Message, MutationResolvers } from '../../../generated';
import ConversationModel from '../../../models/chat/conversation.model';
import { MessageModel } from '../../../models/chat/message.model';
import { userModel } from '../../../models/user/user.model';

// eslint-disable-next-line no-unused-vars
export const addMessage: MutationResolvers['addMessage'] = async (_, { input }) => {
  const { content, senderId, receiverId, images } = input;

  const sender = await userModel.findById({ _id: senderId });

  if (!sender) {
    throw new Error('Sender not found');
  }

  let conversation = await ConversationModel.findOne({
    $or: [
      { userOne: sender._id, userTwo: receiverId },
      { userOne: receiverId, userTwo: sender._id },
    ],
  });

  if (!conversation) {
    conversation = await ConversationModel.create({
      userOne: sender._id,
      userTwo: receiverId,
    });
  }

  const message = await MessageModel.create({
    images,
    senderId: sender._id,
    content,
    conversationId: conversation._id,
    timeStamp: new Date(),
    isRead: false,
  });

  const result = {
    sender: sender.username,
    id: message._id,
    text: message.content,
    images,
  };

  console.log(result);

  return result as unknown as Message;
};
