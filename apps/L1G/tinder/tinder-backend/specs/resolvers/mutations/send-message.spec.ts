import mongoose from 'mongoose';
import { ChatMessageModel } from 'src/models/chat-message';
import { sendMessage } from 'src/resolvers/mutations';

jest.mock('src/models/chat-message');

const mockMatch = {
  _id: new mongoose.Types.ObjectId(),
  users: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
  unmatched: false,
};

describe('sendMessage resolver', () => {
  const senderId = new mongoose.Types.ObjectId().toString();
  const receiverId = new mongoose.Types.ObjectId().toString();
  const matchId = new mongoose.Types.ObjectId().toString();
  const content = 'Hello there!';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends message if valid match exists', async () => {
    const mockCreatedMessage = {
      _id: new mongoose.Types.ObjectId(),
      matchId: new mongoose.Types.ObjectId(matchId),
      senderId: new mongoose.Types.ObjectId(senderId),
      receiverId: new mongoose.Types.ObjectId(receiverId),
      content,
      createdAt: new Date('2025-01-01T12:00:00Z'),
      seen: false,
      notified: false,
    };

    const findOneMock = jest.fn().mockResolvedValue(mockMatch);
    jest.spyOn(mongoose, 'model').mockReturnValueOnce({
      findOne: findOneMock,
    } as any);

    (ChatMessageModel.create as jest.Mock).mockResolvedValue(mockCreatedMessage);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {
         //intenionally empty
    });

    const result = await sendMessage({}, { senderId, receiverId, matchId, content });

    expect(findOneMock).toHaveBeenCalledWith({
      _id: expect.any(mongoose.Types.ObjectId),
      users: { $all: [expect.any(mongoose.Types.ObjectId), expect.any(mongoose.Types.ObjectId)] },
      unmatched: false,
    });

    expect(ChatMessageModel.create).toHaveBeenCalledWith({
      matchId: expect.any(mongoose.Types.ObjectId),
      senderId: expect.any(mongoose.Types.ObjectId),
      receiverId: expect.any(mongoose.Types.ObjectId),
      content,
      seen: false,
      notified: false,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Notify user ${receiverId} of new message from ${senderId}`)
    );

    expect(result).toEqual({
      id: mockCreatedMessage._id.toString(),
      senderId: mockCreatedMessage.senderId.toString(),
      receiverId: mockCreatedMessage.receiverId.toString(),
      content,
      createdAt: '2025-01-01T12:00:00.000Z',
      seen: false,
    });

    consoleSpy.mockRestore();
  });

  it('throws if no valid match is found', async () => {
    const findOneMock = jest.fn().mockResolvedValue(null);
    jest.spyOn(mongoose, 'model').mockReturnValueOnce({
      findOne: findOneMock,
    } as any);

    await expect(sendMessage({
       
    }, { senderId, receiverId, matchId, content }))
      .rejects
      .toThrow('No valid match found between users');

    expect(findOneMock).toHaveBeenCalled();
    expect(ChatMessageModel.create).not.toHaveBeenCalled();
  });
});
