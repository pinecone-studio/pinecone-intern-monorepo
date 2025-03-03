import { GraphQLResolveInfo } from 'graphql';
import { Types } from 'mongoose';
import { getConversation } from '../../../../src/resolvers/queries';
import ConversationModel from '../../../../src/models/chat/conversation.model';
import MessageModel from '../../../../src/models/chat/message.model';
import { userModel } from '../../../../src/models/user/user.model';

jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/conversation.model');
jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/message.model');
jest.mock('apps/L1E/tinder/tinder-be/src/models/user/user.model');

describe('getConversation Resolver', () => {
  const mockConversation = {
    _id: new Types.ObjectId(),
    userOne: new Types.ObjectId(),
    userTwo: new Types.ObjectId(),
  };

  const mockMessages = [
    {
      _id: new Types.ObjectId(),
      content: 'Hello',
      senderId: new Types.ObjectId(),
      conversationId: mockConversation._id,
    },
    {
      _id: new Types.ObjectId(),
      content: 'Hi',
      senderId: new Types.ObjectId(),
      conversationId: mockConversation._id,
    },
  ];

  const mockUser = (id: Types.ObjectId) => ({
    _id: id,
    toObject: () => ({
      _id: id.toString(),
      username: `User${id.toString()}`, // Mock username
      email: `user${id.toString()}@example.com`, // Mock email
    }),
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the conversation with formatted messages', async () => {
    // Mock the user data
    const mockUserOne = mockUser(mockConversation.userOne);
    const mockUserTwo = mockUser(mockConversation.userTwo);

    // Mock the models
    (ConversationModel.findOne as jest.Mock).mockResolvedValue(mockConversation);
    (MessageModel.find as jest.Mock).mockResolvedValue(mockMessages);
    (userModel.findById as jest.Mock).mockResolvedValueOnce(mockUserOne).mockResolvedValueOnce(mockUserTwo);

    const result = await getConversation!(
      {}, // Parent
      { userOne: mockConversation.userOne.toString(), userTwo: mockConversation.userTwo.toString() },
      { req: undefined },
      {} as GraphQLResolveInfo
    );

    // Assert the expected behavior
    expect(ConversationModel.findOne).toHaveBeenCalledWith({
      $or: [
        { userOne: new Types.ObjectId(mockConversation.userOne), userTwo: new Types.ObjectId(mockConversation.userTwo) },
        { userOne: new Types.ObjectId(mockConversation.userTwo), userTwo: new Types.ObjectId(mockConversation.userOne) },
      ],
    });

    expect(MessageModel.find).toHaveBeenCalledWith({ conversationId: mockConversation._id });

    expect(result).toEqual({
      id: mockConversation._id.toString(),
      userOne: mockUserOne.toObject(),
      userTwo: mockUserTwo.toObject(),
      messages: [
        {
          id: mockMessages[0]._id.toString(),
          text: mockMessages[0].content,
          sender: mockMessages[0].senderId.toString(),
        },
        {
          id: mockMessages[1]._id.toString(),
          text: mockMessages[1].content,
          sender: mockMessages[1].senderId.toString(),
        },
      ],
    });
  });

  it('should throw an error if one or both users are not found', async () => {
    // Simulate one user being not found
    (userModel.findById as jest.Mock).mockResolvedValueOnce(null).mockResolvedValueOnce(mockUser(mockConversation.userTwo));

    await expect(
      getConversation!(
        {}, // Parent
        { userOne: mockConversation.userOne.toString(), userTwo: mockConversation.userTwo.toString() },
        { req: undefined },
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('One or both users not found');
  });
});
