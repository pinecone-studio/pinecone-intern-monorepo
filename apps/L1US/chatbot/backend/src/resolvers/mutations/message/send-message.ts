import mongoose from 'mongoose';
import { MutationResolvers } from '../../../generated';
import { MessageModel } from '../../../models';
import { catchError } from '../../../utils';
import { askLlama } from '../../../utils';

async function handleStream(reader: ReadableStreamDefaultReader<Uint8Array>) {
  const decoder = new TextDecoder();
  let responseText = '';

  let done = false;
  while (!done) {
    const { done: chunkDone, value } = await reader.read();
    done = chunkDone;
    if (!done && value) {
      responseText += decoder.decode(value, { stream: true });
    }
  }

  return responseText;
}

export const sendMessage: MutationResolvers['sendMessage'] = async (_, { input }) => {
  const { conversationId, query } = input;

  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw new Error('Invalid conversationId format');
  }

  try {
    const stream = await askLlama(query);
    const reader = stream.getReader();

    const responseText = await handleStream(reader);

    const newMessage = await MessageModel.create({
      conversationId,
      query,
      response: responseText,
    });

    return newMessage.toObject();
  } catch (error) {
    throw catchError(error);
  }
};
