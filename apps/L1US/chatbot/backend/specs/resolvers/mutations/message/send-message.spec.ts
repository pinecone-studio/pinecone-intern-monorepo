import mongoose from 'mongoose';
import { sendMessage } from '../../../../src/resolvers/mutations';
import { MessageModel } from '../../../../src/models';
import { GraphQLResolveInfo } from 'graphql';
import { askLlama } from '../../../../src/utils';

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
const mockStream = {
  getReader: jest.fn().mockReturnValue({
    read: jest
      .fn()
      .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('Echo: ') })
      .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('Hello') })
      .mockResolvedValueOnce({ done: true, value: undefined }),
  }),
};

jest.mock('../../../../src/models', () => ({
  MessageModel: {
    create: jest.fn(),
  },
}));
jest.mock('../../../../src/utils', () => ({
  catchError: jest.fn().mockImplementation((err) => err),
  askLlama: jest.fn(),
}));

describe('sendMessage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error for invalid conversationId format', async () => {
    const input = { conversationId: '123', query: 'Hello' };
    await expect(sendMessage!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid conversationId format');
  });

  it('should create a message successfully with streamed response', async () => {
    (askLlama as jest.Mock).mockResolvedValue(mockStream);
    (MessageModel.create as jest.Mock).mockResolvedValue(mockMessage);

    const result = await sendMessage!({}, { input: validInput }, {} as any, {} as GraphQLResolveInfo);

    expect(askLlama).toHaveBeenCalledWith('Hello');
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

  it('should throw an error if the askLlama stream fails', async () => {
    const error = new Error('Stream failed');
    (askLlama as jest.Mock).mockRejectedValue(error);

    await expect(sendMessage!({}, { input: validInput }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow(error);
  });

  it('should throw an error if creation fails', async () => {
    const error = new Error('Database failure');

    (askLlama as jest.Mock).mockResolvedValue({
      getReader: jest.fn().mockReturnValue({
        read: jest
          .fn()
          .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('Echo: ') })
          .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('Hello') })
          .mockResolvedValueOnce({ done: true, value: null }), 
      }),
    });

    (MessageModel.create as jest.Mock).mockRejectedValue(error);

    await expect(sendMessage!({}, { input: validInput }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Database failure');
  });
});
