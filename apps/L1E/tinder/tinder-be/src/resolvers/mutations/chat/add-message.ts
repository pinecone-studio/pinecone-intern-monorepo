import { Message, MutationResolvers } from '../../../generated';
import ConversationModel from '../../../models/chat/conversation.model';
import { MessageModel } from '../../../models/chat/message.model';
import { userModel } from '../../../models/user/user.model';

// eslint-disable-next-line no-unused-vars
export const addMessage: MutationResolvers['addMessage'] = async (_, { content, userId, chosenUserId }) => {
  const sender = await userModel.findById({ _id: userId });

  if (!sender) {
    throw new Error('Sender not found');
  }

  let conversation = await ConversationModel.findOne({
    $or: [
      { userOne: sender._id, userTwo: chosenUserId },
      { userOne: chosenUserId, userTwo: sender._id },
    ],
  });

  if (!conversation) {
    conversation = await ConversationModel.create({
      userOne: sender._id,
      userTwo: chosenUserId,
    });
  }

  const message = await MessageModel.create({
    senderId: sender._id,
    content,
    conversationId: conversation._id,
    timeStamp: new Date(),
    isRead: false,
  });

  const result = {
    sender: sender.username, // Only return sender's username (or _id if preferred)
    id: message._id,
    text: message.content, // Ensure that message content is used for the text field
  };

  return result as unknown as Message;
};
