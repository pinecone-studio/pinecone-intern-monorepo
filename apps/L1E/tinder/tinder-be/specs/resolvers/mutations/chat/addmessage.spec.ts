import { addMessage } from 'apps/L1E/tinder/tinder-be/src/resolvers/mutations';

import { MessageModel } from 'apps/L1E/tinder/tinder-be/src/models/chat/message.model';
import { userModel } from 'apps/L1E/tinder/tinder-be/src/models/user/user.model';
import ConversationModel from 'apps/L1E/tinder/tinder-be/src/models/chat/conversation.model';

jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/message.model');
jest.mock('apps/L1E/tinder/tinder-be/src/models/user/user.model');
jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/conversation.model');

describe('addMessage Mutation Resolver', () => {
  const mockUserId = 'user123';
  const mockChosenUserId = 'user456';
  const mockContent = 'Hello, world!';
  const mockSender = { _id: mockUserId, username: 'testUser' };
  const mockConversation = { _id: 'conv123' };
  const mockMessage = {
    _id: 'msg123',
    content: mockContent,
    senderId: mockUserId,
    conversationId: 'conv123',
    timeStamp: new Date(),
    isRead: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a message to an existing conversation', async () => {
    // Mock implementations
    (userModel.findById as jest.Mock).mockResolvedValue(mockSender);
    (ConversationModel.findOne as jest.Mock).mockResolvedValue(mockConversation);
    (MessageModel.create as jest.Mock).mockResolvedValue(mockMessage);

    const result = await addMessage!({}, { content: mockContent, userId: mockUserId, chosenUserId: mockChosenUserId }, {} as any, {} as any);

    expect(userModel.findById).toHaveBeenCalledWith({ _id: mockUserId });
    expect(ConversationModel.findOne).toHaveBeenCalled();
    expect(MessageModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        senderId: mockUserId,
        content: mockContent,
        conversationId: mockConversation._id,
      })
    );
    expect(result).toEqual({
      sender: mockSender.username,
      id: mockMessage._id,
      text: mockMessage.content,
    });
  });

  it('should create a new conversation if one does not exist', async () => {
    // Mock implementations
    (userModel.findById as jest.Mock).mockResolvedValue(mockSender);
    (ConversationModel.findOne as jest.Mock).mockResolvedValue(null);
    (ConversationModel.create as jest.Mock).mockResolvedValue(mockConversation);
    (MessageModel.create as jest.Mock).mockResolvedValue(mockMessage);

    await addMessage!({}, { content: mockContent, userId: mockUserId, chosenUserId: mockChosenUserId }, {} as any, {} as any);

    expect(ConversationModel.create).toHaveBeenCalledWith({
      userOne: mockUserId,
      userTwo: mockChosenUserId,
    });
    expect(MessageModel.create).toHaveBeenCalled();
  });

  it('should throw an error if sender is not found', async () => {
    // Mock implementation
    (userModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(addMessage!({}, { content: mockContent, userId: mockUserId, chosenUserId: mockChosenUserId }, {} as any, {} as any)).rejects.toThrow('Sender not found');

    expect(ConversationModel.findOne).not.toHaveBeenCalled();
    expect(MessageModel.create).not.toHaveBeenCalled();
  });
});
