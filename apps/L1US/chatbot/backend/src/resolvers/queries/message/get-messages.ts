import mongoose from 'mongoose';
import { Message, QueryResolvers } from '../../../generated';
import { catchError } from '../../../utils';
import { MessageModel } from '../../../models';

export const getMessages: QueryResolvers['getMessages'] = async (_, { conversationId }) => {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new Error('Invalid conversationId format');
  }
  try {
    const messages = await MessageModel.find<Message>({ conversationId }).populate('conversationId');

    return messages as Message[];
  } catch (error) {
    throw catchError(error);
  }
};
