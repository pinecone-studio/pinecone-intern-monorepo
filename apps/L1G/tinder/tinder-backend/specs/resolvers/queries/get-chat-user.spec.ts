import mongoose from 'mongoose';
import { MatchModel } from 'src/models/match';
import { Usermodel } from 'src/models/user';
import { ChatMessageModel } from 'src/models/chat-message';
import { getChatWithUser } from 'src/resolvers/queries';

jest.mock('src/models/match');
jest.mock('src/models/user');
jest.mock('src/models/chat-message');

describe('getChatWithUser resolver', () => {
  const userObjectId = new mongoose.Types.ObjectId();
  const participantObjectId = new mongoose.Types.ObjectId();
  const matchObjectId = new mongoose.Types.ObjectId();

  const userId = userObjectId.toString();
  const participantId = participantObjectId.toString();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns chat with participant and messages including default seen as false', async () => {
    const mockMatch = {
      _id: matchObjectId,
      users: [userObjectId, participantObjectId],
      unmatched: false,
    };

    const mockParticipant = {
      _id: participantObjectId,
      name: 'John Doe',
      images: ['img.jpg'],
    };

    const messageObjectId = new mongoose.Types.ObjectId();

    const mockMessages = [
      {
        _id: messageObjectId,
        senderId: userObjectId,
        receiverId: participantObjectId,
        content: 'Hello!',
        createdAt: new Date('2025-01-01T12:00:00Z'),
      },
    ];

    (MatchModel.findOne as jest.Mock).mockReturnValue({
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

    const result = await getChatWithUser({}, { userId, participantId });

    expect(result).toEqual({
      matchId: matchObjectId.toString(),
      participant: {
        id: participantObjectId.toString(),
        name: 'John Doe',
        image: 'img.jpg',
      },
      messages: [
        {
          id: messageObjectId.toString(),
          senderId: userObjectId.toString(),
          receiverId: participantObjectId.toString(),
          content: 'Hello!',
          createdAt: '2025-01-01T12:00:00.000Z',
          seen: false,
        },
      ],
    });
  });

  it('throws an error if match is not found', async () => {
    (MatchModel.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(null),
    });

    await expect(getChatWithUser({}, { userId, participantId })).rejects.toThrow('No match found');
  });

  it('throws an error if participant user not found', async () => {
    const mockMatch = {
      _id: matchObjectId,
      users: [userObjectId, participantObjectId],
      unmatched: false,
    };

    (MatchModel.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockMatch),
    });

    (Usermodel.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      }),
    });

    await expect(getChatWithUser({}, { userId, participantId })).rejects.toThrow('Participant user not found');
  });

  it('sets participant image to null if images array is missing or empty', async () => {
    const mockMatch = {
      _id: matchObjectId,
      users: [userObjectId, participantObjectId],
      unmatched: false,
    };

    const mockParticipant = {
      _id: participantObjectId,
      name: 'No Image User',
      images: [],
    };

    const mockMessages: any[] = [];

    (MatchModel.findOne as jest.Mock).mockReturnValue({
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

    const result = await getChatWithUser({}, { userId, participantId });

    expect(result?.participant.image).toBeUndefined();
    expect(result?.messages).toEqual([]);
  });
});
