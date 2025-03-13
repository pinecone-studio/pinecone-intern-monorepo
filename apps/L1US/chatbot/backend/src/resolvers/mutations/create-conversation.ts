import mongoose from 'mongoose';
import { MutationResolvers } from '../../generated';
import { ConversationModel } from '../../models';
import { catchError } from '../../utils/catch-error';

export const createConversation: MutationResolvers['createConversation'] = async (_, { input }) => {
  const { userId, name } = input;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId format');
  }

  try {
    const newConversation = await ConversationModel.create({
      userId,
      name,
    });
    return newConversation.toObject();
  } catch (error) {
    throw catchError(error);
  }
};
