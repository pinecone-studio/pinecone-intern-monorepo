import ConversationModel from 'apps/L1E/tinder/tinder-be/src/models/chat/conversation.model';
import { userModel } from 'apps/L1E/tinder/tinder-be/src/models/user/user.model';
import { getAllConversations } from 'apps/L1E/tinder/tinder-be/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

// Mock the models
jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/conversation.model');
jest.mock('apps/L1E/tinder/tinder-be/src/models/user/user.model');

describe('getAllConversations', () => {
  it('should return all conversations with user details', async () => {
    const mockConversations = [
      {
        _id: 'conversationId1',
        userOne: 'userId1',
        userTwo: 'userId2',
      },
    ];

    const mockUserOne = {
      _id: 'userId1',
      name: 'User One',
      email: 'userone@example.com',
      toObject: jest.fn().mockReturnValue({
        name: 'User One',
        email: 'userone@example.com',
      }),
    };

    const mockUserTwo = {
      _id: 'userId2',
      name: 'User Two',
      email: 'usertwo@example.com',
      toObject: jest.fn().mockReturnValue({
        name: 'User Two',
        email: 'usertwo@example.com',
      }),
    };

    // Mock the ConversationModel.find() response
    (ConversationModel.find as jest.Mock).mockResolvedValue(mockConversations);

    // Mock the userModel.findById() responses
    (userModel.findById as jest.Mock)
      .mockResolvedValueOnce(mockUserOne) // Mock userOne response
      .mockResolvedValueOnce(mockUserTwo); // Mock userTwo response

    // Call the resolver
    const result = await getAllConversations!({}, {}, { req: undefined }, {} as GraphQLResolveInfo);

    // Assert the result
    expect(result).toEqual([
      {
        id: 'conversationId1',
        userOne: {
          id: 'userId1',
          name: 'User One',
          email: 'userone@example.com',
        },
        userTwo: {
          id: 'userId2',
          name: 'User Two',
          email: 'usertwo@example.com',
        },
      },
    ]);

    // Ensure the mocks were called correctly
    expect(ConversationModel.find).toHaveBeenCalledTimes(1);
    expect(userModel.findById).toHaveBeenCalledWith('userId1');
    expect(userModel.findById).toHaveBeenCalledWith('userId2');
  });

  it('should throw an error if no conversations are found', async () => {
    (ConversationModel.find as jest.Mock).mockResolvedValue([]);

    await expect(getAllConversations!({}, {}, { req: undefined }, {} as GraphQLResolveInfo)).rejects.toThrow('No conversations found');
  });

  it('should throw an error if one or both users are not found', async () => {
    const mockConversations = [
      {
        _id: 'conversationId1',
        userOne: 'userId1',
        userTwo: 'userId2',
      },
    ];

    (ConversationModel.find as jest.Mock).mockResolvedValue(mockConversations);
    (userModel.findById as jest.Mock).mockResolvedValueOnce(null); // Mock userOne not found

    await expect(getAllConversations!({}, {}, { req: undefined }, {} as GraphQLResolveInfo)).rejects.toThrow('One or both users not found for conversation conversationId1');
  });
});
