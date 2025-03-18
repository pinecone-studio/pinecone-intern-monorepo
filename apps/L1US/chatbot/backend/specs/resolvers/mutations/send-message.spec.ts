import mongoose from 'mongoose';
import { sendMessage } from '../../../src/resolvers/mutations';
import { MessageModel } from '../../../src/models';
import { GraphQLResolveInfo } from 'graphql';

const validConversationId = new mongoose.Types.ObjectId().toHexString();
const validInput = { conversationId: validConversationId, query: 'Hello' };

const mockMessage = {
  toObject: jest.fn().mockReturnValue({
    _id: '123',
    conversationId: validConversationId,
    query: 'Hello',
    response: 'Echo: Hello',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
};

jest.mock('../../../src/models', () => ({
  MessageModel: {
    create: jest.fn(),
  },
}));

describe('sendMessage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error for invalid conversationId format', async () => {
    const input = { conversationId: '123', query: 'Hello' };
    await expect(sendMessage!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid conversationId format');
  });

  it('should create a message successfully', async () => {
    (MessageModel.create as jest.Mock).mockResolvedValue(mockMessage);

    const result = await sendMessage!({}, { input: validInput }, {} as any, {} as GraphQLResolveInfo);

    expect(MessageModel.create).toHaveBeenCalledWith({
      conversationId: validConversationId,
      query: 'Hello',
      response: 'Echo: Hello',
    });
    expect(mockMessage.toObject).toHaveBeenCalled();
    expect(result).toEqual({
      _id: '123',
      conversationId: validConversationId,
      query: 'Hello',
      response: 'Echo: Hello',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should throw an error if creation fails', async () => {
    const error = new Error('Database failure');
    (MessageModel.create as jest.Mock).mockRejectedValue(error);

    await expect(sendMessage!({}, { input: validInput }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Database failure');
  });
});
