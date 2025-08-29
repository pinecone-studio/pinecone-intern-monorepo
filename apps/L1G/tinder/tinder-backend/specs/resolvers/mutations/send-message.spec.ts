/* eslint-disable max-lines */

import mongoose from 'mongoose';
import { ChatMessageModel } from 'src/models/chat-message';
import { MatchModel } from 'src/models/match';
import { sendMessage } from 'src/resolvers/mutations';

jest.mock('src/models/chat-message');
jest.mock('src/models/match');

describe('sendMessage resolver', () => {
  const senderId = new mongoose.Types.ObjectId().toString();
  const receiverId = new mongoose.Types.ObjectId().toString();
  const matchId = new mongoose.Types.ObjectId().toString();
  const content = 'Hello there!';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('sends message if valid match exists and conversation already started', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(matchId),
      users: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(receiverId)],
      unmatched: false,
      startedConversation: true,
    };

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

    (MatchModel.findOne as jest.Mock).mockResolvedValue(mockMatch);
    (MatchModel.updateOne as jest.Mock).mockResolvedValue({ acknowledged: true });
    (ChatMessageModel.create as jest.Mock).mockResolvedValue(mockCreatedMessage);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      //intenionally empty
    });

    const result = await sendMessage(
      {
        //intenionally empty
      },
      { senderId, receiverId, matchId, content }
    );

    expect(MatchModel.findOne).toHaveBeenCalledWith({
      _id: expect.any(mongoose.Types.ObjectId),
      users: { $all: [expect.any(mongoose.Types.ObjectId), expect.any(mongoose.Types.ObjectId)] },
      unmatched: false,
    });

    expect(MatchModel.updateOne).not.toHaveBeenCalled(); // Should not be called since conversation already started

    expect(ChatMessageModel.create).toHaveBeenCalledWith({
      matchId: expect.any(mongoose.Types.ObjectId),
      senderId: expect.any(mongoose.Types.ObjectId),
      receiverId: expect.any(mongoose.Types.ObjectId),
      content,
      seen: false,
      notified: false,
    });

    expect(consoleSpy).toHaveBeenCalledWith(`📨 Notify user ${receiverId} of new message from ${senderId}`);

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

  it('sends message and sets startedConversation if not started yet', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(matchId),
      users: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(receiverId)],
      unmatched: false,
      startedConversation: false, // Not started yet
    };

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

    (MatchModel.findOne as jest.Mock).mockResolvedValue(mockMatch);
    (MatchModel.updateOne as jest.Mock).mockResolvedValue({ acknowledged: true });
    (ChatMessageModel.create as jest.Mock).mockResolvedValue(mockCreatedMessage);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      //intenionally empty
    });

    const result = await sendMessage(
      {
        //intenionally empty
      },
      { senderId, receiverId, matchId, content }
    );

    expect(MatchModel.updateOne).toHaveBeenCalledWith({ _id: mockMatch._id }, { $set: { startedConversation: true } });

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

  it('sends message and sets startedConversation if startedConversation is undefined', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(matchId),
      users: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(receiverId)],
      unmatched: false,
      // startedConversation is undefined
    };

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

    (MatchModel.findOne as jest.Mock).mockResolvedValue(mockMatch);
    (MatchModel.updateOne as jest.Mock).mockResolvedValue({ acknowledged: true });
    (ChatMessageModel.create as jest.Mock).mockResolvedValue(mockCreatedMessage);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      //intenionally empty
    });

    await sendMessage(
      {
        //intenionally empty
      },
      { senderId, receiverId, matchId, content }
    );

    expect(MatchModel.updateOne).toHaveBeenCalledWith({ _id: mockMatch._id }, { $set: { startedConversation: true } });

    consoleSpy.mockRestore();
  });

  it('throws if no valid match is found', async () => {
    (MatchModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      sendMessage(
        {
          //intenionally empty
        },
        { senderId, receiverId, matchId, content }
      )
    ).rejects.toThrow('No valid match found between users');

    expect(MatchModel.findOne).toHaveBeenCalledWith({
      _id: expect.any(mongoose.Types.ObjectId),
      users: { $all: [expect.any(mongoose.Types.ObjectId), expect.any(mongoose.Types.ObjectId)] },
      unmatched: false,
    });

    expect(ChatMessageModel.create).not.toHaveBeenCalled();
    expect(MatchModel.updateOne).not.toHaveBeenCalled();
  });

  it('handles database error when finding match', async () => {
    (MatchModel.findOne as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

    await expect(
      sendMessage(
        {
          //intenionally empty
        },
        { senderId, receiverId, matchId, content }
      )
    ).rejects.toThrow('Database connection failed');

    expect(ChatMessageModel.create).not.toHaveBeenCalled();
  });

  it('handles database error when updating match', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(matchId),
      users: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(receiverId)],
      unmatched: false,
      startedConversation: false,
    };

    (MatchModel.findOne as jest.Mock).mockResolvedValue(mockMatch);
    (MatchModel.updateOne as jest.Mock).mockRejectedValue(new Error('Update failed'));

    await expect(
      sendMessage(
        {
          //intenionally empty
        },
        { senderId, receiverId, matchId, content }
      )
    ).rejects.toThrow('Update failed');

    expect(ChatMessageModel.create).not.toHaveBeenCalled();
  });

  it('handles database error when creating message', async () => {
    const mockMatch = {
      _id: new mongoose.Types.ObjectId(matchId),
      users: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(receiverId)],
      unmatched: false,
      startedConversation: true,
    };

    (MatchModel.findOne as jest.Mock).mockResolvedValue(mockMatch);
    (ChatMessageModel.create as jest.Mock).mockRejectedValue(new Error('Message creation failed'));

    await expect(
      sendMessage(
        {
          //intenionally empty
        },
        { senderId, receiverId, matchId, content }
      )
    ).rejects.toThrow('Message creation failed');
  });
});
