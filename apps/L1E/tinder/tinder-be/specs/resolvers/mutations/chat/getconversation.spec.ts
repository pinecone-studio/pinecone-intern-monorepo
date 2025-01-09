import ConversationModel from 'apps/L1E/tinder/tinder-be/src/models/chat/conversation.model';
import MessageModel from 'apps/L1E/tinder/tinder-be/src/models/chat/message.model';
import { getConversation } from 'apps/L1E/tinder/tinder-be/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';
import { Types } from 'mongoose';

jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/conversation.model');
jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/message.model');

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the conversation with formatted messages', async () => {
    (ConversationModel.findOne as jest.Mock).mockResolvedValue(mockConversation);
    (MessageModel.find as jest.Mock).mockResolvedValue(mockMessages);

    const result = await getConversation!(
      {}, // Parent
      { userOne: mockConversation.userOne.toString(), userTwo: mockConversation.userTwo.toString() },
      { req: undefined },
      {} as GraphQLResolveInfo
    );

    expect(ConversationModel.findOne).toHaveBeenCalledWith({
      $and: [{ userOne: new Types.ObjectId(mockConversation.userOne) }, { userTwo: new Types.ObjectId(mockConversation.userTwo) }],
    });

    expect(MessageModel.find).toHaveBeenCalledWith({ conversationId: mockConversation._id });

    expect(result).toEqual({
      id: mockConversation._id.toString(),
      userOne: mockConversation.userOne.toString(),
      userTwo: mockConversation.userTwo.toString(),
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
});
