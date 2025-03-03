import { MutationResolvers } from '../../generated';
import { MessageModel } from '../../models';
import { v4 as uuidv4 } from 'uuid';

export const sendMessage: MutationResolvers['sendMessage'] = async(_, { input }) => {
    if (!input) {
        throw new Error('Input is required');
    }
    const { chatID, query } = input;
    const response = `Echo: ${query}`;

    const newMessage = await MessageModel.create({
        id: uuidv4(),
        chatID,
        query,
        response,
        timestamp: new Date()
    });
    return newMessage;
}
