import mongoose from 'mongoose';
import { MutationResolvers } from '../../generated';
import { MessageModel } from '../../models';
import { catchError } from '../../utils';

export const sendMessage: MutationResolvers['sendMessage'] = async (_, { input }) => {
  const { conversationId, query } = input;
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new Error('Invalid conversationId format');
  }
  const response = `Echo: ${query}`;

  try {
    const newMessage = await MessageModel.create({
      conversationId,
      query,
      response,
    });
    return newMessage.toObject();
  } catch (error) {
    throw catchError(error);
  }
};
