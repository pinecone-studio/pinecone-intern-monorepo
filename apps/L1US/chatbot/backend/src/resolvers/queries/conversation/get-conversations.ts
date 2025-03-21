import mongoose from 'mongoose';
import { Conversation, QueryResolvers } from '../../../generated';
import { catchError } from '../../../utils';
import { ConversationModel } from '../../../models';

export const getConversations: QueryResolvers['getConversations'] = async (_, { userId }) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId format');
  }
  try {
    const conversations = await ConversationModel.find<Conversation>({ userId });
    return conversations;
  } catch (error) {
    throw catchError(error);
  }
};
