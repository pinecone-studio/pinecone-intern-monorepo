import mongoose from 'mongoose';
import { ConversationModel } from '../../../src/models';
import { createConversation } from '../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

const validUserId = new mongoose.Types.ObjectId().toHexString();
const input = { userId: validUserId, name: 'Test Conversation' };

const mockConversation = {
  toObject: jest.fn().mockReturnValue({
    _id: '123',
    userId: validUserId,
    name: 'Test Conversation',
  }),
};

jest.mock('../../../src/models', () => ({
  ConversationModel: {
    create: jest.fn(),
  },
}));

jest.mock('../../../src/utils/catch-error', () => ({
  catchError: jest.fn((error) => error),
}));

describe('createConversation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error for invalid userId format', async () => {
    const input = { userId: '123', name: 'Test Conversation' };

    await expect(createConversation!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid userId format');
  });

  it('should create a conversation successfully', async () => {
    (ConversationModel.create as jest.Mock).mockResolvedValue(mockConversation);

    const result = await createConversation!({}, { input }, {} as any, {} as GraphQLResolveInfo);

    expect(ConversationModel.create).toHaveBeenCalledWith({
      userId: validUserId,
      name: 'Test Conversation',
    });
    expect(mockConversation.toObject).toHaveBeenCalled();
    expect(result).toEqual({
      _id: '123',
      userId: validUserId,
      name: 'Test Conversation',
    });
  });

  it('should throw an error if creation fails', async () => {
    const error = new Error('Database failure');

    (ConversationModel.create as jest.Mock).mockRejectedValue(error);

    await expect(createConversation!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Database failure');
  });
});
