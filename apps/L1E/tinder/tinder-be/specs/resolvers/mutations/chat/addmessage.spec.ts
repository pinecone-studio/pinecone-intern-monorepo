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
  const mockImages = ['image1.png', 'image2.png']; // Example images
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
    (userModel.findById as jest.Mock).mockResolvedValue(mockSender);
    (ConversationModel.findOne as jest.Mock).mockResolvedValue(mockConversation);
    (MessageModel.create as jest.Mock).mockResolvedValue(mockMessage);

    // Wrap the input in an object as per the mutation
    const result = await addMessage!({}, { input: { content: mockContent, senderId: mockUserId, receiverId: mockChosenUserId, images: mockImages } }, {} as any, {} as any);

    expect(userModel.findById).toHaveBeenCalledWith({ _id: mockUserId });
    expect(ConversationModel.findOne).toHaveBeenCalled();
    expect(MessageModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        senderId: mockUserId,
        content: mockContent,
        conversationId: mockConversation._id,
        images: mockImages, // Ensure images are passed
      })
    );
    expect(result).toEqual({
      sender: mockSender.username,
      id: mockMessage._id,
      text: mockMessage.content,
      images: mockImages, // Ensure images are included in the result
    });
  });

  it('should create a new conversation if one does not exist', async () => {
    // Mock implementations
    (userModel.findById as jest.Mock).mockResolvedValue(mockSender);
    (ConversationModel.findOne as jest.Mock).mockResolvedValue(null);
    (ConversationModel.create as jest.Mock).mockResolvedValue(mockConversation);
    (MessageModel.create as jest.Mock).mockResolvedValue(mockMessage);

    // Wrap the input in an object as per the mutation
    await addMessage!({}, { input: { content: mockContent, senderId: mockUserId, receiverId: mockChosenUserId, images: mockImages } }, {} as any, {} as any);

    expect(ConversationModel.create).toHaveBeenCalledWith({
      userOne: mockUserId,
      userTwo: mockChosenUserId,
    });
    expect(MessageModel.create).toHaveBeenCalled();
  });

  it('should throw an error if sender is not found', async () => {
    // Mock implementation
    (userModel.findById as jest.Mock).mockResolvedValue(null);

    // Wrap the input in an object as per the mutation
    await expect(addMessage!({}, { input: { content: mockContent, senderId: mockUserId, receiverId: mockChosenUserId, images: mockImages } }, {} as any, {} as any)).rejects.toThrow(
      'Sender not found'
    );

    expect(ConversationModel.findOne).not.toHaveBeenCalled();
    expect(MessageModel.create).not.toHaveBeenCalled();
  });
});
