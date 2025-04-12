import mongoose from 'mongoose';
import { getMessages } from '../../../../src/resolvers/queries';
import { MessageModel } from '../../../../src/models';
import { GraphQLResolveInfo } from 'graphql';

const validConversationId = new mongoose.Types.ObjectId().toHexString();
const invalidConversationId = 'invalid-id';

const mockMessage = {
  _id: new mongoose.Types.ObjectId().toHexString(),
  conversationId: validConversationId,
  text: 'Hello',
  createdAt: new Date(),
  updatedAt: new Date(),
};

jest.mock('../../../../src/models', () => ({
  MessageModel: {
    find: jest.fn(),
  },
}));

describe('getMessages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error for invalid conversationId format', async () => {
    await expect(getMessages!({}, { conversationId: invalidConversationId }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid conversationId format');
  });

  it('should return messages with populated conversationId', async () => {
    (MessageModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockResolvedValue([mockMessage]),
    });

    const result = await getMessages!({}, { conversationId: validConversationId }, {} as any, {} as GraphQLResolveInfo);

    expect(MessageModel.find).toHaveBeenCalledWith({ conversationId: validConversationId });
    expect(result).toEqual([mockMessage]);
  });

  it('should throw an error if fetching messages fails', async () => {
    (MessageModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error('Database error')),
    });

    await expect(getMessages!({}, { conversationId: validConversationId }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Database error');
  });
});
