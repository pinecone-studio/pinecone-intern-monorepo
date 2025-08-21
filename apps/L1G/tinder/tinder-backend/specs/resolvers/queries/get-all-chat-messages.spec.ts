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

  it('returns all chat messages with participants', async () => {
    const mockMatch = [
      {
        _id: matchId,
        users: [new mongoose.Types.ObjectId(userId), new mongoose.Types.ObjectId(participantId)],
        unmatched: false,
      },
    ];

    const mockParticipant = {
      _id: new mongoose.Types.ObjectId(participantId),
      name: 'Alice',
      images: ['pic.jpg'],
    };

    const mockMessages = [
      {
        _id: new mongoose.Types.ObjectId(),
        senderId: new mongoose.Types.ObjectId(userId),
        receiverId: new mongoose.Types.ObjectId(participantId),
        content: 'Hi Alice!',
        createdAt: '2025-01-01T12:00:00.000Z',
        seen: false,
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

    expect(result).toEqual([
      {
        matchId: matchId.toString(),
        participant: {
          id: mockParticipant._id.toString(),
          name: 'Alice',
          image: 'pic.jpg',
        },
        messages: [
          {
            id: mockMessages[0]._id.toString(),
            senderId: mockMessages[0].senderId.toString(),
            receiverId: mockMessages[0].receiverId.toString(),
            content: 'Hi Alice!',
            createdAt: mockMessages[0].createdAt,
            seen: false,
          },
        ],
      },
    ]);
  });

  it('skips match if participant not found', async () => {
    const mockMatch = [
      {
        _id: matchId,
        users: [new mongoose.Types.ObjectId(userId)],
        unmatched: false,
      },
    ];

    (MatchModel.find as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockMatch),
    });

    const result = await getUserAllChatMessages({}, { userId });
    expect(result).toEqual([]);
  });
});
