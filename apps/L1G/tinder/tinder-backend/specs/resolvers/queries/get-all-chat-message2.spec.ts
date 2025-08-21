import mongoose from 'mongoose';
import { getUserAllChatMessages } from 'src/resolvers/queries/get-all-chat-messages';
import { ChatMessageModel } from 'src/models/chat-message';
import { MatchModel } from 'src/models/match';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/match');
jest.mock('src/models/user');
jest.mock('src/models/chat-message');
describe('getUserAllChatMessages', () => {
  const userId = new mongoose.Types.ObjectId().toString();
  const participantId = new mongoose.Types.ObjectId().toString();
  const matchId = new mongoose.Types.ObjectId();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('handles participant with no images', async () => {
    const mockMatch = [
      {
        _id: matchId,
        users: [new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(participantId)],
        unmatched: false,
      },
    ];

    const mockParticipant = {
      _id: new mongoose.Types.ObjectId(participantId),
      name: 'NoImageUser',
      images: [],
    };

    (MatchModel.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockMatch),
    });

    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockParticipant),
      }),
    });

    (ChatMessageModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue([]),
        }),
      }),
    });

    const result = await getUserAllChatMessages({}, { userId });

    expect(result[0].participant.image).toBeUndefined();
    expect(result[0].messages).toEqual([]);
  });
  it('returns empty when participant user is not found', async () => {
    const mockMatch = [
      {
        _id: matchId,
        users: [new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(participantId)],
        unmatched: false,
      },
    ];

    (MatchModel.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockMatch),
    });

    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      }),
    });

    const result = await getUserAllChatMessages({}, { userId });

    expect(result).toEqual([]);
  });
  it('sets seen to false if not present in message', async () => {
    const mockMatch = [
      {
        _id: matchId,
        users: [new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(participantId)],
        unmatched: false,
      },
    ];

    const mockParticipant = {
      _id: new mongoose.Types.ObjectId(participantId),
      name: 'Test User',
      images: ['pic.jpg'],
    };

    const mockMessages = [
      {
        _id: new mongoose.Types.ObjectId(),
        senderId: new mongoose.Types.ObjectId(userId),
        receiverId: new mongoose.Types.ObjectId(participantId),
        content: 'No seen property here!',
        createdAt: '2025-01-01T12:00:00.000Z',
      },
    ];

    (MatchModel.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockMatch),
    });

    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockParticipant),
      }),
    });

    (ChatMessageModel.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockMessages),
        }),
      }),
    });

    const result = await getUserAllChatMessages({}, { userId });

    expect(result[0].messages[0].seen).toBe(false);
  });
});
