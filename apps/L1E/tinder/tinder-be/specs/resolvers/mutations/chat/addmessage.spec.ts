import { addMessage } from 'apps/L1E/tinder/tinder-be/src/resolvers/mutations';
import FolderModel from 'apps/L1E/tinder/tinder-be/src/models/chat/folder.model';
import { MessageModel } from 'apps/L1E/tinder/tinder-be/src/models/chat/message.model';
import { userModel } from 'apps/L1E/tinder/tinder-be/src/models/user/user.model';

jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/message.model');
jest.mock('apps/L1E/tinder/tinder-be/src/models/user/user.model');
jest.mock('apps/L1E/tinder/tinder-be/src/models/chat/folder.model');

// Define the type for the addMessage function
// eslint-disable-next-line no-unused-vars
type AddMessageFunction = (parent: object, args: { content: string; userId: string; chosenUserId: string }, context: { req: any }, info: unknown) => Promise<unknown>;

const typedAddMessage = addMessage as AddMessageFunction;

describe('addMessage', () => {
  it('should throw an error if sender is not found', async () => {
    // Mock the models' methods to simulate no sender found
    (userModel.findById as jest.Mock).mockResolvedValue(null); // Simulate no sender found

    const content = 'Hello';
    const userId = 'senderId';
    const chosenUserId = 'receiverId';

    const context = { req: {} };
    const info = {};

    // Call the function and check for the error
    await expect(typedAddMessage({}, { content, userId, chosenUserId }, context, info)).rejects.toThrow('Sender not found'); // Expect the error to be thrown
  });

  it('should successfully add a message and return the sender', async () => {
    // Mock data for sender, conversation, and message
    const mockSender = { _id: 'senderId', username: 'testSender' };
    const mockNewConversation = { _id: 'newConversationId' };
    const mockMessage = { _id: 'messageId', content: 'Hello', senderId: 'senderId' };

    // Mock the models' methods
    (userModel.findById as jest.Mock).mockResolvedValue(mockSender); // Simulate finding a sender
    (FolderModel.findOne as jest.Mock).mockResolvedValue(null); // Simulate no existing conversation
    (FolderModel.create as jest.Mock).mockResolvedValue(mockNewConversation); // Simulate creating a new conversation
    (MessageModel.create as jest.Mock).mockResolvedValue(mockMessage);

    const content = 'Hello';
    const userId = 'senderId';
    const chosenUserId = 'receiverId';

    const context = { req: {} };
    const info = {};

    // Call the function and check results
    const result = await typedAddMessage({}, { content, userId, chosenUserId }, context, info);

    // Assertions
    expect(userModel.findById).toHaveBeenCalledWith({ _id: userId });
    expect(FolderModel.findOne).toHaveBeenCalledWith({
      $or: [
        { userOne: mockSender._id, userTwo: chosenUserId },
        { userOne: chosenUserId, userTwo: mockSender._id },
      ],
    });
    expect(FolderModel.create).toHaveBeenCalledWith({
      userOne: mockSender._id,
      userTwo: chosenUserId,
    });
    expect(MessageModel.create).toHaveBeenCalledWith({
      senderId: mockSender._id,
      content,
      conversationId: mockNewConversation._id,
      timeStamp: expect.any(Date),
      isRead: false,
    });

    expect(result).toEqual(mockSender);
  });
});
