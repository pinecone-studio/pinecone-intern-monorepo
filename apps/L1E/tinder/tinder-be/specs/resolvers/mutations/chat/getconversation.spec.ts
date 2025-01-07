import ConversationModel from 'apps/L1E/tinder/tinder-be/src/models/chat/conversation.model';
import { MessageModel } from 'apps/L1E/tinder/tinder-be/src/models/chat/message.model';
import { getConversation } from 'apps/L1E/tinder/tinder-be/src/resolvers/queries';

// Mock the models
jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/conversation.model');
jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/message.model');

describe('getConversation Query Resolver', () => {
  const mockUserOne = 'user123';
  const mockUserTwo = 'user456';
  const mockConversation = {
    _id: 'conv123',
    userOne: mockUserOne,
    userTwo: mockUserTwo,
  };
  const mockMessages = [
    { _id: 'msg1', content: 'Hello', senderId: mockUserOne },
    { _id: 'msg2', content: 'Hi there', senderId: mockUserTwo },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a conversation with messages when it exists', async () => {
    // Mock implementations
    (ConversationModel.findOne as jest.Mock).mockResolvedValue(mockConversation);
    (MessageModel.find as jest.Mock).mockResolvedValue(mockMessages);

    const result = await getConversation!({}, { userOne: mockUserOne, userTwo: mockUserTwo }, {} as any, {} as any);

    expect(ConversationModel.findOne).toHaveBeenCalledWith({
      $and: [{ userOne: mockUserOne }, { userTwo: mockUserTwo }],
    });
    expect(MessageModel.find).toHaveBeenCalledWith({ conversationId: mockConversation._id });
    expect(result).toEqual({
      id: mockConversation._id.toString(),
      userOne: mockUserOne,
      userTwo: mockUserTwo,
      messages: [
        { id: 'msg1', text: 'Hello', sender: mockUserOne },
        { id: 'msg2', text: 'Hi there', sender: mockUserTwo },
      ],
    });
  });

  it('should throw an error when conversation is not found', async () => {
    // Mock implementation
    (ConversationModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(getConversation!({}, { userOne: mockUserOne, userTwo: mockUserTwo }, {} as any, {} as any)).rejects.toThrow('Conversation not found');

    expect(ConversationModel.findOne).toHaveBeenCalledWith({
      $and: [{ userOne: mockUserOne }, { userTwo: mockUserTwo }],
    });
    expect(MessageModel.find).not.toHaveBeenCalled();
  });

  it('should return an empty messages array when no messages exist', async () => {
    // Mock implementations
    (ConversationModel.findOne as jest.Mock).mockResolvedValue(mockConversation);
    (MessageModel.find as jest.Mock).mockResolvedValue([]);

    const result = await getConversation!({}, { userOne: mockUserOne, userTwo: mockUserTwo }, {} as any, {} as any);

    expect(ConversationModel.findOne).toHaveBeenCalledWith({
      $and: [{ userOne: mockUserOne }, { userTwo: mockUserTwo }],
    });
    expect(MessageModel.find).toHaveBeenCalledWith({ conversationId: mockConversation._id });
    expect(result).toEqual({
      id: mockConversation._id.toString(),
      userOne: mockUserOne,
      userTwo: mockUserTwo,
      messages: [],
    });
  });
});
