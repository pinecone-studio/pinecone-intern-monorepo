import mongoose from 'mongoose';
import { MutationResolvers } from '../../generated';
import { MessageModel } from '../../models';
import { catchError } from '../../utils';

export const sendMessage: MutationResolvers['sendMessage'] = async (_, { input }) => {
  const { chatId, query } = input;
  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    throw new Error('Invalid chatId format');
  }
  const response = `Echo: ${query}`;
  
  try {
    const newMessage = await MessageModel.create({
      chatId,
      query,
      response,
    });
    return newMessage.toObject();
  } catch (error) {
    throw catchError(error);
  }
};
