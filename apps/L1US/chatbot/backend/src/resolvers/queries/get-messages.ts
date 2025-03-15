import mongoose from 'mongoose';
import { QueryResolvers } from '../../generated';
import { catchError } from '../../utils';
import { MessageModel } from '../../models';

export const getMessages: QueryResolvers['getMessages'] = async (_, { conversationId }) => {
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new Error('Invalid conversationId format');
  }
  try {
    const messages = await MessageModel.find({ chatId: conversationId }).sort({ createdAt: 1 }).exec();
    return messages.map((message) => message.toObject());
  } catch (error) {
    throw catchError(error);
  }
};
