import mongoose from 'mongoose';
import { catchError } from '../../../utils';
import { MessageModel } from '../../../models';
import { Message, QueryResolvers } from '../../../generated';

export const getMessages: QueryResolvers['getMessages'] = async (_, { conversationId }) => {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new Error('Invalid conversationId format');
  }
  try {
    const messages = await MessageModel.find<Message>({ conversationId }).populate('conversationId');
    return messages;
  } catch (error) {
    throw catchError(error);
  }
};
