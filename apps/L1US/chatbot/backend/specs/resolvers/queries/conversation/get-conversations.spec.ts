import mongoose from 'mongoose';
import { getConversations } from '../../../../src/resolvers/queries';
import { ConversationModel } from '../../../../src/models';
import { GraphQLResolveInfo } from 'graphql';

const validUserId = new mongoose.Types.ObjectId().toHexString();
const invalidUserId = 'invalid-id';

const mockConversation = {
  _id: new mongoose.Types.ObjectId().toHexString(),
  userId: validUserId,
};

jest.mock('../../../../src/models', () => ({
  ConversationModel: {
    find: jest.fn(),
  },
}));

describe('getConversations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error for invalid userId format', async () => {
    await expect(
      getConversations!({}, { userId: invalidUserId }, {} as any, {} as GraphQLResolveInfo)
    ).rejects.toThrow('Invalid userId format');
  });

  it('should return conversations for a valid userId', async () => {
    (ConversationModel.find as jest.Mock).mockResolvedValue([mockConversation]);

    const result = await getConversations!({}, { userId: validUserId }, {} as any, {} as GraphQLResolveInfo);

    expect(ConversationModel.find).toHaveBeenCalledWith({ userId: validUserId });
    expect(result).toEqual([mockConversation]);
  });

  it('should throw an error if fetching conversations fails', async () => {
    (ConversationModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(
      getConversations!({}, { userId: validUserId }, {} as any, {} as GraphQLResolveInfo)
    ).rejects.toThrow('Database error');
  });
});
