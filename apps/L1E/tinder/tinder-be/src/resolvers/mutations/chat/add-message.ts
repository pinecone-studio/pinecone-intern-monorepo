import { MessageModel } from '../../../models/chat/message.model';
import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models/user/user.model';
import FolderModel from '../../../models/chat/folder.model';

// eslint-disable-next-line no-unused-vars
export const addMessage: MutationResolvers['addMessage'] = async (_, { content, userId, chosenUserId }, context, info) => {
  const sender = await userModel.findOne({ _id: userId });

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

  return sender;
};
