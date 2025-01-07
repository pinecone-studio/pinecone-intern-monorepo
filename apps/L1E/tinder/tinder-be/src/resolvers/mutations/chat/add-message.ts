import { Message, MutationResolvers } from '../../../generated';
import FolderModel from '../../../models/chat/folder.model';
import { MessageModel } from '../../../models/chat/message.model';
import { userModel } from '../../../models/user/user.model';

// eslint-disable-next-line no-unused-vars
export const addMessage: MutationResolvers['addMessage'] = async (_, { content, userId, chosenUserId }, context, info) => {
  const sender = await userModel.findById({ _id: userId });

  // Check if sender is null
  if (!sender) {
    throw new Error('Sender not found');
  }

  let conversation = await FolderModel.findOne({
    $or: [
      { userOne: sender._id, userTwo: chosenUserId },
      { userOne: chosenUserId, userTwo: sender._id },
    ],
  });

  if (!conversation) {
    conversation = await FolderModel.create({
      userOne: sender._id,
      userTwo: chosenUserId,
    });
  }

  await MessageModel.create({
    senderId: sender._id,
    content,
    conversationId: conversation._id,
    timeStamp: new Date(),
    isRead: false,
  });

  return sender as unknown as Message;
};
