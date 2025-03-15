import mongoose from 'mongoose';
import { getMessages } from '../../../src/resolvers/queries';
import { MessageModel } from '../../../src/models';
import { GraphQLResolveInfo } from 'graphql';

const validConversationId = new mongoose.Types.ObjectId().toHexString();
const invalidConversationId = '123';

const mockMessage = {
  toObject: jest.fn().mockReturnValue({
    _id: '123',
    chatId: validConversationId,
    query: 'Hello',
    response: 'Echo: Hello',
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
};

jest.mock('../../../src/models', () => ({
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

  it('should return messages sorted by createdAt', async () => {
    const sortMock = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockMessage]) });
    (MessageModel.find as jest.Mock).mockReturnValue({ sort: sortMock });

    const result = await getMessages!({}, { conversationId: validConversationId }, {} as any, {} as GraphQLResolveInfo);

    expect(MessageModel.find).toHaveBeenCalledWith({ chatId: validConversationId });
    expect(sortMock).toHaveBeenCalledWith({ createdAt: 1 });
    expect(mockMessage.toObject).toHaveBeenCalled();
    expect(result).toEqual([
      {
        _id: '123',
        chatId: validConversationId,
        query: 'Hello',
        response: 'Echo: Hello',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);
  });

  it('should throw an error if fetching messages fails', async () => {
    const sortMock = jest.fn().mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('Database failure')) });
    (MessageModel.find as jest.Mock).mockReturnValue({ sort: sortMock });

    await expect(getMessages!({}, { conversationId: validConversationId }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Database failure');
  });
});
