import { QueryResolvers, AllConversation, User } from '../../../generated';
import ConversationModel from '../../../models/chat/conversation.model';
import { userModel } from '../../../models/user/user.model';

export const getAllConversations: QueryResolvers['getAllConversations'] = async (): Promise<AllConversation[]> => {
  const conversations = await ConversationModel.find();

  if (!conversations || conversations.length === 0) {
    throw new Error('No conversations found');
  }

  const conversationsWithDetails = await Promise.all(
    conversations.map(async (conversation) => {
      const userOneDoc = await userModel.findById(conversation.userOne);
      const userTwoDoc = await userModel.findById(conversation.userTwo);

      if (!userOneDoc || !userTwoDoc) {
        throw new Error(`One or both users not found for conversation ${conversation._id}`);
      }

      const userOne: User = {
        ...userOneDoc.toObject(),
        id: userOneDoc._id.toString(),
      };
      const userTwo: User = {
        ...userTwoDoc.toObject(),
        id: userTwoDoc._id.toString(),
      };

      return {
        id: conversation._id.toString(),
        userOne,
        userTwo,
      };
    })
  );

  return conversationsWithDetails;
};
